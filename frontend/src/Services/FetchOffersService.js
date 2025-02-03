import { baseUrl, endpointsUrls } from "../constants.js"

export const FetchOffersService = async(ID_user) => {
    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}?ID_user=${ID_user}`;
        const response = await fetch(apiUrl)
        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }      
        return response;
} 