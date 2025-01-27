import { baseUrl, endpointsUrls } from "../constants"



export const CityService = () =>{


    const getAllCities = async() =>{

        const response = await fetch(`${baseUrl}${endpointsUrls.RALL_CITIES}`)

        if(!response){
            throw new Error("Error al obtener las ciudades")
        }

        return response.json()
    }

    return {getAllCities}
}