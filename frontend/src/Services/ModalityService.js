import { baseUrl, endpointsUrls } from "../constants"

export const ModalityService = () =>{

    const getAllModalities = async () =>{
        const response = await fetch(`${baseUrl}${endpointsUrls.RALL_MODALITIES}`)
        
        if(!response){
            throw new Error("Error al obtener las modalidades");
        }

        return response.json()
    }


    return {getAllModalities}
}