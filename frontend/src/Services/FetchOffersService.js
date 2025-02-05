
import { baseUrl, endpointsUrls } from "../constants.js";

export const FetchOffersService = async (userId) => {

    const token = localStorage.getItem("Token"); 

    if (!token) {
        console.error("No hay token de autenticación");
        return [];
    }

    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}/user/${userId}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error al obtener las ofertas de empleo");
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};