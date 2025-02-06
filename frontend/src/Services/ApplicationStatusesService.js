import { baseUrl, endpointsUrls } from "../constants";
import api from "./api";

export const ApplicationStatusesService =  () => {

    const GetApplicationStatusesService = async () =>{
        try {
            const response = await api.get(`${baseUrl}${endpointsUrls.RALL_APPLICATION_STATUSES}`);
            return response; 

        } catch (error) {
          
            throw error;
        }

    }

    return {GetApplicationStatusesService}

};
