import { baseUrl, endpointsUrls } from "../constants"
import api from "./api";


export const jobApplicationService = () =>{

    const postjobApplication = async (formData) =>{
        const API_BASE_URL = baseUrl;


        const response = await api.post(`${baseUrl}${endpointsUrls.C_JOB_APPLICATION}`, formData);
        if(!response){
            throw new Error("Error al postularse")
        }
        
        return response.data;
    }

    const MyapplicationsService = async (idUser) =>{
        try{
            const response = await api.get(`${baseUrl}${endpointsUrls.R_JOB_APPLICATIONS_BY_USER}/${idUser}`);
            return response;



        }catch(error){

        }
    }

    const DeleteApplicationsService = async (ID_application) =>{

        try{


            const response = await api.delete(`${baseUrl}${endpointsUrls.D_JOB_APPLICATION}/${ID_application}`);
            return response;



        }catch(error){

        }
    }
    return {postjobApplication, MyapplicationsService, DeleteApplicationsService}
}