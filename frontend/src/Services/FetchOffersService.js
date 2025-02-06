
import { baseUrl, endpointsUrls } from "../constants.js";
import api from "./api.js";

export const FetchOffersService = async (userId) => {

    const token = localStorage.getItem("Token"); 

    if (!token) {
        console.error("No hay token de autenticación");
        return [];
    }

    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}/user/${userId}`;
    
    try {
        const response = await api.get(apiUrl);

        return response.data; 
 
    } catch (error) {
        console.error(error);
        return [];
    }
};