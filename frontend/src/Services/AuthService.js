export const LoginUserService = async (email, password) => {
    try {
        //PREGUNTAR COMO SE HACE
        // const LoginApi = `${process.env.REACT_APP_SV_HOST}${process.env.REACT_APP_LOGIN}`;

        const formData = {
            email: email,
            password:  password
        };

        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });        
        return response; 
    } catch (error) {
      
        throw error;
    }
};
