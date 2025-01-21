import { useContext, useState } from "react";
import { LoginUserService } from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";



const useLogin = () => {

    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();  // Hook to programmatically navigate


    const UseloginUser = async (email, password) => {
        try {
            const response = await LoginUserService(email, password);
            if (response.status === 200) {
                const data = await response.json();
                login(data.token);
                
                localStorage.setItem('FirstLogin', 'Logeado');
                navigate('/Home', { state: { logged: true, message: 'Logeado exitoso' } });  // Redirect to Home
                return true;
            }
            if (response.status === 400) {
                alert('e')
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
