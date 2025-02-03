import { baseUrl, endpointsUrls } from "../constants.js"

export const FetchOffersService = async() => {
    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}/user/:userId`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error al obtener las ofertas de empleo");
        }
        const data = await response.json();
        const filteredOffers = data.filter(offer => offer.User?.name === "ESTEBAN RATA LIENDO");
        return filteredOffers;
    } catch (error) {
        console.error(error);
        return [];
    }
};