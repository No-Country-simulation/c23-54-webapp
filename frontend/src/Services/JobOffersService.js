import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { baseUrl, endpointsUrls } from "../constants";

export const JobOffersService = () => {
    const { Token, idUser } = useContext(AuthContext);

    const getAllOffers = async () => {
        const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}`

        const response = await fetch(apiUrl)

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        return {
            response: response.json(),
            status: response.status,
            message: response.message
        }
    }

    const CreateJobOffer = async (data) => {
        const apiUrl = `${baseUrl}${endpointsUrls.C_JOB_OFFERS}`

        const dataTocreate = {
            ...data,
            publication_date: new Date(),
            status: "open",
            ID_user: idUser
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
            },
            body: JSON.stringify(dataTocreate)
        })

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        return {
            response: response.json(),
            status: response.status,
            message: response.message
        };
    }

    const getOfferById = async (ID_offer) => {
        const apiUrl = `${baseUrl}${endpointsUrls.RONE_JOB_OFFERS}/${ID_offer}`

        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        return {
            data: await response.json(),
            status: response.status,
            message: response.message
        }
    }

    return { getAllOffers, CreateJobOffer, getOfferById }
}