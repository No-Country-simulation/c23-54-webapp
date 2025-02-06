import { baseUrl, endpointsUrls } from "../constants"
import api from "./api"



export const CityService = () =>{


    const getAllCities = async() =>{

        const response = await api.get(`${baseUrl}${endpointsUrls.RALL_CITIES}`)

        if(!response){
            throw new Error("Error al obtener las ciudades")
        }

        return response.data
    }

    return {getAllCities}
}