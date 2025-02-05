import { baseUrl, endpointsUrls } from "../constants"


export const jobCategoriesService = () =>{


    const getAllJobCategories = async () =>{

        const response = await fetch(`${baseUrl}${endpointsUrls.RALL_JOB_CATEGORY}`)

        if(!response){
            throw new Error("Error al obtener las categorias de trabajo")
        }

        return response.json();
    }

    return {getAllJobCategories}
}