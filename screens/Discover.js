import { Image, SafeAreaView, View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar } from '../assets';

const Discover = () => {
  // remove the app bar tab
  const navigation = useNavigation();
  useLayoutEffect(() => {
     navigation.setOptions({
     headerShown: false
   });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-8 mt-5">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold"> Discover </Text>
          <Text className="text-[#527283] text-[36px]"> the beauty today </Text>
        </View>
        <View className="w-24 h-24 bg-gray-400 rounded-full">
          <Image
              source={Avatar}
              className="w-full h-full rounded-full object-cover"
          />
        </View>
      </View>

      {/* search bar and autocomplete */}
      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyCvkQOx5Cz_xcJSQ6YIoWONmgRHjG0s-Q8',
            language: 'en',
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default Discover
