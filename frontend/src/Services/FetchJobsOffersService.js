import { useContext } from "react";
import { baseUrl, endpointsUrls } from "../constants.js"
import { AuthContext } from "../Context/AuthContext.js";

export const FetchJobOffersService = async () => {
    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}`
    const response = await fetch(apiUrl)


    if (!response) {
        throw new Error("Error al obtener las ofertas de empleo");
    }


    return response;

}