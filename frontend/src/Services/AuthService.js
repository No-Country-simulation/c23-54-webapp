import { endpointsUrls } from "../constants";
import api from "./api";

export const LoginUserService = async (email, password) => {
    try {
        //PREGUNTAR COMO SE HACE
        // const LoginApi = `${process.env.REACT_APP_SV_HOST}${process.env.REACT_APP_LOGIN}`;

        const formData = {
            email: email,
            password:  password
        };
        const response = await api.post(endpointsUrls.R_ONE_USER_LOGIN, formData);
       
        
        return response; 
    } catch (error) {
      
        throw error;
    }
};
