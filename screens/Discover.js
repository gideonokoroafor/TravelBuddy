import { ActivityIndicator, Image, SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Attractions, Avatar, Hotels, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {
  // remove the app bar tab
  const navigation = useNavigation();

  const [type, setType] = useState("attractions");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useLayoutEffect(() => {
     navigation.setOptions({
     headerShown: false
   });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(()=>{
        setIsLoading(false);
      }, 2000);
    })
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 mt-5">
        <View>
          <Text className="text-[36px] text-[#0B646B] font-bold"> Discover </Text>
          <Text className="text-[#527283] text-[32px]"> the beauty today </Text>
        </View>
        <View className="w-20 h-20 bg-gray-400 rounded-full">
          <Image
              source={Avatar}
              className="w-full h-full rounded-full object-cover"
          />
        </View>
      </View>

      {/* search bar and autocomplete */}
      <View className="flex-row items-center bg-white mx-4 rounded-xl 
      py-1 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields:"geometry"}}
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: 'AIzaSyCvkQOx5Cz_xcJSQ6YIoWONmgRHjG0s-Q8',
            language: 'en',
          }}
        />
      </View>

      {/* menu container */}
      { isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ):
        (<ScrollView>
        <View className="flex-row items-center justify-between px-4 mt-8">
          <MenuContainer
            key={"hotels"}
            title="Hotels"
            imageSrc={Hotels}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={"attractions"}
            title="Attractions"
            imageSrc={Attractions}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={"restaurants"}
            title="Restaurants"
            imageSrc={Restaurants}
            type={type}
            setType={setType}
          />
        </View>

        <View>
          <View className="flex-row justify-between items-center px-4 mt-8">
            <Text className="text-[#2C7379] text-[28px] font-bold"> Top Tips </Text>
            <TouchableOpacity>
              <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
            </TouchableOpacity>
          </View>

          <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
            {
              mainData?.length > 0 ? (
                <>
                  {mainData?.filter(data => data?.name && data?.location_string).map((data, i) => (
                    <ItemCardContainer
                        key={i}
                        imageSrc={
                        data?.photo?.images?.medium?.url ?
                        data?.photo?.images?.medium?.url : "https://recyclingbalers.s3.amazonaws.com/image/No%20Image.jpg"
                        }
                        title={data?.name}
                        location={data?.location_string}
                        data={data}
                    />
                    ))}
                  
                </>
              ) : (
                <>
                  <View className="w-full h-[100px] items-center justify-center space-y-8"></View>
                  <Text className="text-[#2C7379] text-[28px]">No data found</Text>
                </>
              )
            }
          </View>
        </View>
        </ScrollView>)
      }
    </SafeAreaView>
  )
}

export default Discover
