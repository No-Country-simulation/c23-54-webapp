import { baseUrl, endpointsUrls } from "../constants"
import api from "./api"


export const jobCategoriesService = () =>{


    const getAllJobCategories = async () =>{

        const response = await api.get(`${baseUrl}${endpointsUrls.RALL_JOB_CATEGORY}`)

        if(!response){
            throw new Error("Error al obtener las categorias de trabajo")
        }

        return response.data;
    }

    return {getAllJobCategories}
}