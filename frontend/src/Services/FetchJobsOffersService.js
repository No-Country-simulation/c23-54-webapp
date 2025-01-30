import { baseUrl, endpointsUrls } from "../constants.js"


export const FetchJobOffersService = async() => {
    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}`

   

        const response = await fetch(apiUrl)


        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }
        
        return response;
    


}