import { Image, View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const ItemCardContainer = ({imageSrc, title, location, data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate("PlacesDetails", {param: data})}
    className="rounded-md border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[182px] my-2">
        <Image
            source={{uri:imageSrc}}
            className="w-full h-40 rounded-md object-cover"
        />
        {title ? (
            <>
               <Text className="text-[#428288] text-[18px] font-bold ">{
                  title?.length > 14 ? `${title.slice(0, 14)}..` : title}
               </Text>
               <View className="flex-row items-center space-x-2">
                  <FontAwesome name="map-marker" size={20} color="#A0C4C7" />
                  <Text className="text-[#428288] text-[14px] font-bold ">{
                    location?.length > 14 ? `${location.slice(0, 14)}..` : location}
                  </Text>
                </View>
            </>
          ) : (<></>)
        }
    </TouchableOpacity>
  )
}

export default ItemCardContainer
