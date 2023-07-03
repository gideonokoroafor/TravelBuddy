import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type, limit) => {
    try{
        const {data : {data}} = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            { params: {
                bl_latitude: bl_lat ? bl_lat:'6.393351056211393',
                tr_latitude: tr_lat ? tr_lat:'6.702759096222693',
                bl_longitude: bl_lng ? bl_lng:'3.098273230475269',
                tr_longitude: tr_lng? tr_lng:'3.564808',
                limit: limit ? limit : 30,
                currency: 'USD',
                lunit: 'mi',
                lang: 'en_US'
              },
              headers: {
                'X-RapidAPI-Key': '3bd03931a6msh452bfa37aba9c5ap164de5jsn3d3c760f3aa3',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
            }
        );
        return data;
    } catch (error) {
        return null
    }
}