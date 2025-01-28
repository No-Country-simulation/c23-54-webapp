import { useContext, useState } from "react";
import { LoginUserService } from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";



const useLogin = () => {

    const [error, setError] = useState(null);
    const { login, SetIdUser} = useContext(AuthContext);
    const navigate = useNavigate();  


    const UseloginUser = async (email, password) => {
        try {
            const response = await LoginUserService(email, password);
            if (response.status === 200) {
                const data = await response.json();
                 login(data.token);
                 SetIdUser(data.user.ID_user)
                localStorage.setItem('FirstLogin', 'Logeado');
                navigate('/Home', { state: { logged: true, message: 'Logeado exitoso' } }); 
                return true;
            }
            if (response.status === 400) {

                setError("Usuario o contraseña incorrectos");
            }

        } catch (error) {
            setError("Error al iniciar sesión");
            console.error("Error al iniciar sesión:", error);
            return false;



        }
    };

    return { UseloginUser, error, setError };
};

export default useLogin;
