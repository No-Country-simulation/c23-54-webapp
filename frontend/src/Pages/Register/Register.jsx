import { yupResolver } from "@hookform/resolvers/yup";
import OutlinedButton from "../../Components/OutlinedButton/OutlinedButton"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import BgButton from "../../Components/BgButton/BgButton";
import Logo from '../../Assets/icons/Logo.png';
import ErrorMessage from "../../Components/Alerts/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const registerSchemaStepOne = yup.object().shape({
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

const registerSchemaStepTwo = yup.object().shape({
    username: yup
        .string("El formato del nombre de usuario es invalido")
        .required("El nombre de usuario es obligatorio"),

    name: yup
        .string("El formato del nombre es invalido")
        .required("El nombre y apellido son obligatorios"),

    phone: yup
        .string(),

    address: yup
        .string(),

    city: yup
        .number()
        .required("La ciudad es obligatoria"),

    role: yup
        .number()
        .required("El tipo de usuario es obligatorio")
})

const Register = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const [citiesList, setCitiesList] = useState([]);
    const [rolesList, setRolesList] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(currentStep === 1 ? registerSchemaStepOne : registerSchemaStepTwo),
        mode: "onChange",
    });

    const goToNextStep = (data) => {
        setFormData(data)
        reset()
        setCurrentStep(2);
    };


    const finalStepSubmit = (data) => {
        setFormData({
            ...formData,
            ...data
        })
        console.log(formData);
    }

    const redirectToLogin = () => {
        reset();
        navigate('/login')
    }

    return (
        <div className="page__container">
            <form
                onSubmit={handleSubmit(currentStep === 1 ? goToNextStep : finalStepSubmit)}
                className="page__container__template register__container" >
                <div className="register__header padding-template">

                    <p className="text-gray">
                        {currentStep === 1 ? "¡Crea tu cuenta!" : "¡Falta poco para comenzar!"}
                    </p>

                    <div>
                        <OutlinedButton
                            title={currentStep === 1 ? "¡Inicia Sesión!" : "Volver"}
                            otherClases="non-shadow"
                            onClick={currentStep === 1 ? redirectToLogin : () => setCurrentStep(1)}
                        />

                    </div>


                </div>

                <div className="register__main padding-template">

                    {currentStep === 1 ? (
                        <>
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
                                disabled={!isValid}
                            />
                        </>
                    )

                        :

                        currentStep === 2 ? (
                            <>
                                <div className="input-container">
                                    <label
                                        className="input-label"
                                        htmlFor="username">
                                        Nombre de Usuario
                                    </label>

                                    <input
                                        className="input-field"
                                        type="text"
                                        {...register("username")}
                                        placeholder="juanperez01"
                                    />

                                    {errors && errors.username?.message && (
                                        <ErrorMessage
                                            message={errors.username?.message}
                                        />
                                    )}
                                </div>

                                <div className="input-container">
                                    <label
                                        className="input-label"
                                        htmlFor="name">
                                        Nombre completo
                                    </label>

                                    <input
                                        className="input-field"
                                        type="text"
                                        {...register("name")}
                                        placeholder="Juan Perez"
                                    />

                                    {errors && errors.name?.message && (
                                        <ErrorMessage
                                            message={errors.name?.message}
                                        />
                                    )}

                                </div>


                                <div className="input-container">
                                    <label
                                        className="input-label"
                                        htmlFor="phone">
                                        Telefono
                                    </label>

                                    <input
                                        className="input-field"
                                        type="text"
                                        {...register("phone")}
                                        placeholder="+12 345678"
                                    />

                                    {errors && errors.phone?.message && (
                                        <ErrorMessage
                                            message={errors.phone?.message}
                                        />
                                    )}

                                </div>


                                <div className="input-container">
                                    <label
                                        className="input-label"
                                        htmlFor="address">
                                        Dirección
                                    </label>

                                    <input
                                        className="input-field"
                                        type="text"
                                        {...register("address")}
                                        placeholder="+12 345678"
                                    />

                                    {errors && errors.address?.message && (
                                        <ErrorMessage
                                            message={errors.address?.message}
                                        />
                                    )}

                                </div>

                                <div className="input-container">
                                    <label
                                        className="input-label"
                                        htmlFor="city">
                                        Ciudad
                                    </label>

                                    <select
                                        className="input-field"
                                        type="text"
                                        {...register("city")}
                                        placeholder="Ingrese una ciudad"
                                    >
                                        <option
                                            value={1}
                                        >options</option>
                                    </select>

                                    {errors && errors.city?.message && (
                                        <ErrorMessage
                                            message={errors.city?.message}
                                        />
                                    )}

                                </div>

                                <div className="input-container">
                                    <label
                                        className="input-label"
                                        htmlFor="role">
                                        Tipo de usuario
                                    </label>

                                    <select
                                        className="input-field"
                                        type="text"
                                        {...register("role")}
                                        placeholder="Ingrese una ciudad"
                                    >
                                        <option
                                            value={1}
                                        >options</option>
                                    </select>

                                    {errors && errors.role?.message && (
                                        <ErrorMessage
                                            message={errors.role?.message}
                                        />
                                    )}

                                </div>

                                <BgButton
                                    title={"Completar Registro"}
                                    type="submit"
                                    disabled={!isValid}
                                />
                            </>
                        ) : null
                    }

                </div>

                <div className="register__footer padding-template">
                    <img src={Logo} alt="Logo" />
                </div>
            </form>

        </div>
    )
}

export default Register