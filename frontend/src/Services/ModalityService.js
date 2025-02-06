import { baseUrl, endpointsUrls } from "../constants"
import api from "./api";

export const ModalityService = () =>{

    const getAllModalities = async () =>{
        const response = await api.get(`${baseUrl}${endpointsUrls.RALL_MODALITIES}`)
        
        if(!response){
            throw new Error("Error al obtener las modalidades");
        }

        return response.data
    }


    return {getAllModalities}
}