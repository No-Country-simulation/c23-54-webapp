import { baseUrl, endpointsUrls } from "../constants.js"


export const JobOffersService = () => {
    const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}`

    const getAllOffers = async () => {

        const response = await fetch(apiUrl)

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        console.log(response)
        return response.json();
    }









    return { getAllOffers }
}