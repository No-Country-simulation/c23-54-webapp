import { yupResolver } from "@hookform/resolvers/yup";
import OutlinedButton from "../../Components/OutlinedButton/OutlinedButton"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import BgButton from "../../Components/BgButton/BgButton";
import Logo from '../../Assets/icons/Logo.png';
import ErrorMessage from "../../Components/Alerts/ErrorMessage/ErrorMessage";

const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email("Debes introducir un email válido.")
        .required("El email es obligatorio"),

    password: yup
        .string("El formato de la contraseña es incorrecto")
        .min(8, "La contraseña debe contener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),

    confirmPassword: yup
        .string("El formato de la contraseña es incorrecto")
        .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Debes confirmar tu contraseña")
})

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {
        console.log("data: ", data)
    }

    return (
        <div className="page__container">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="page__container__template register__container" >
                <div className="register__header padding-template">

                    <p className="text-gray">¡Crea tu cuenta!</p>

                    <div>
                        <OutlinedButton
                            title={"Inicia Sesión"}
                            otherClases="non-shadow"
                            onClick={console.log(`Save: `)}
                        />

                    </div>


                </div>

                <div className="register__main padding-template">

                    <div className="input-container">
                        <label
                            className="input-label"
                            htmlFor="email">
                            Correo Electronico
                        </label>

                        <input
                            className="input-field"
                            type="text"
                            {...register("email")}
                            placeholder="Juanperez222@gmail.com"
                        />

                        {errors && errors.email?.message && (
                            <ErrorMessage
                                message={errors.email?.message}
                            />
                        )}
                    </div>

                    <div className="input-container">
                        <label
                            className="input-label"
                            htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            className="input-field"
                            type="password"
                            {...register("password")}
                            placeholder="Ingrese una contraseña segura"
                        />

                        {errors && errors.password?.message && (
                            <ErrorMessage
                                message={errors.password?.message}
                            />
                        )}
                    </div>

                    <div className="input-container">
                        <label
                            className="input-label"
                            htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>

                        <input
                            className="input-field"
                            type="text"
                            {...register("confirmPassword")}
                            placeholder="Vuelva a introducir su clave"
                        />

                        {errors && errors.confirmPassword?.message && (
                            <ErrorMessage
                                message={errors.confirmPassword?.message}
                            />
                        )}
                    </div>

                    <BgButton
                        title={"Registrarse"}
                        type="submit"
                        disabled={errors && Object.keys(errors).length > 0 ? true : false}
                    />
                </div>

                <div className="register__footer padding-template">
                    <img src={Logo} alt="Logo" />
                </div>
            </form>

        </div>
    )
}

export default Register