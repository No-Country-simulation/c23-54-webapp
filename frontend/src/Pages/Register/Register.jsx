import { yupResolver } from "@hookform/resolvers/yup";
import OutlinedButton from "../../Components/OutlinedButton/OutlinedButton"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup";
import BgButton from "../../Components/BgButton/BgButton";
import Logo from '../../Assets/icons/Logo.png';
import ErrorMessage from "../../Components/Alerts/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import JoditEditor from 'jodit-react';
import AlertToast from "../../Components/Alerts/Toasts/AlertToast";
import SuccessToast from "../../Components/Alerts/Toasts/SuccessToast";


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
        .required("Debes confirmar tu contraseña"),
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

    country: yup
        .number()
        .typeError("Debe seleccionar algo")
        .required("El país es obligatorio"),

    city: yup
        .number()
        .typeError("Debe seleccionar algo")
        .required("La ciudad es obligatoria"),

    role: yup
        .number()
        .typeError("Debe seleccionar algo")
        .required("El tipo de usuario es obligatorio"),
    description: yup
        .string()
})


const Register = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [showAlertToast, setShowALertToast] = useState(false);

    const [showSuccessToast, setSuccessALertToast] = useState(false);
    const [messageToast, setMessageToast] = useState("");

    const navigate = useNavigate();

    const [citiesList, setCitiesList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [rolesList, setRolesList] = useState([]);

    const editor = useRef(null);
    const {
        control,
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

    const finalStepSubmit = async (data) => {



        try {
            setFormData({
                ...formData,
                ...data,
                status: "Active"
            })

            const registerApi = `${process.env.REACT_APP_SV_HOST}${process.env.REACT_APP_C_USER}`;

            const registerFetch = await fetch(registerApi, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (registerFetch.status === 400) {
                setShowALertToast(true);
                setMessageToast("Error al registrarse, intentelo de nuevo más tarde");
                setTimeout(() => {
                    setShowALertToast(false)
                }, 2000)
            }

            setSuccessALertToast(true);
            setMessageToast("Registro exitoso, sera redigirido instantaneamete");
            setTimeout(() => {
                setSuccessALertToast(false)
            }, 2000)

        } catch (error) {
            setShowALertToast(true);
            setMessageToast("Error al registrarse, intentelo de nuevo más tarde");
            setTimeout(() => {
                setShowALertToast(false)
            }, 2000)
        }

    }

    const redirectToLogin = () => {
        reset();
        navigate('/login')
    }

    console.log(formData)
    useEffect(() => {

        const getDataForSelects = async () => {

            const countriesApi = fetch(`${process.env.REACT_APP_SV_HOST}${process.env.REACT_APP_RALL_COUNTRIES}`);
            const citiesApi = fetch(`${process.env.REACT_APP_SV_HOST}${process.env.REACT_APP_RALL_CITIES}`);
            const rolesApi = fetch(`${process.env.REACT_APP_SV_HOST}${process.env.REACT_APP_RALL_ROLES}`);

            setIsLoading(true);

            try {

                const [resultCountries, resultCities, resultRoles] = await Promise.all([countriesApi, citiesApi, rolesApi]);


                const countries = await resultCountries.json();
                const cities = await resultCities.json();
                const citiesFilteredByCountry = cities.filter((city) => String(city.ID_country) === String(selectedCountry));
                const roles = await resultRoles.json();


                setCountriesList(countries);
                setCitiesList(citiesFilteredByCountry);
                setRolesList(roles)

                setIsLoading(false);

            } catch (error) {
                setShowALertToast(true);
                setMessageToast("Error al conectar con los servidores, intentalo de nuevo más adelante");
                setTimeout(() => {
                    setShowALertToast(false)
                }, 2000)
            }
        }

        getDataForSelects()
    }, [selectedCountry])

    const handleSelectedCountry = (value) => {
        setSelectedCountry(value);
    }

    return (
        <div className="page__container">
            {showAlertToast && (
                <AlertToast
                    message_toast={messageToast}
                />
            )}

            {showSuccessToast && (
                <SuccessToast
                    message_toast={messageToast}
                />
            )}

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

                <div className="register__main">

                    {currentStep === 1 ? (
                        <div className="register__first__step-container">
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
                        </div>
                    )

                        :

                        currentStep === 2 ? (
                            <div className="register__second__step__container">
                                <div className="register__second__step__section">
                                    <h4>Datos de Cuenta y personales</h4>


                                    <div className="input-container">
                                        <label
                                            className="input-label"
                                            htmlFor="username">
                                            Nombre de Usuario
                                            <span className="tip-text-obligatory"> *(Obligatorio)</span>
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
                                            <span className="tip-text-obligatory"> *(Obligatorio)</span>
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
                                            htmlFor="country">
                                            Ciudad
                                            <span className="tip-text-obligatory"> *(Obligatorio)</span>
                                        </label>

                                        <select
                                            className="input-field"
                                            {...register("country")}
                                            placeholder="Ingrese una ciudad"
                                            onChange={(e) => {
                                                const selectedValue = e.target.value
                                                handleSelectedCountry(selectedValue);
                                            }}
                                        >

                                            <option
                                                value={null}
                                            >
                                                Seleccione un pais
                                            </option>
                                            {countriesList && countriesList.map((country) => (

                                                <option
                                                    key={country.ID_country}
                                                    value={country.ID_country}
                                                >
                                                    {country.name}
                                                </option>

                                            ))}
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
                                            htmlFor="city">
                                            Ciudad
                                            <span className="tip-text-obligatory"> *(Obligatorio)</span>
                                        </label>

                                        <select
                                            className="input-field"
                                            type="text"
                                            {...register("city")}
                                            placeholder="Ingrese una ciudad"
                                        >

                                            <option
                                                value={null}
                                            >
                                                Seleccione una ciudad
                                            </option>
                                            {citiesList && citiesList.map((city) => (

                                                <option
                                                    key={city.ID_city}
                                                    value={city.ID_city}
                                                >
                                                    {city.name}
                                                </option>

                                            ))}
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
                                            <span className="tip-text-obligatory"> *(Obligatorio)</span>
                                        </label>

                                        <select
                                            className="input-field"
                                            type="text"
                                            {...register("role")}
                                            placeholder="Ingrese una ciudad"
                                        >
                                            <option
                                                value={null}
                                            >
                                                Seleccione un tipo de usuario
                                            </option>
                                            {rolesList && rolesList.map((role) => (

                                                <option
                                                    key={role.ID_role}
                                                    value={role.ID_role}
                                                >
                                                    {role.name}
                                                </option>

                                            ))}
                                        </select>

                                        {errors && errors.role?.message && (
                                            <ErrorMessage
                                                message={errors.role?.message}
                                            />
                                        )}

                                    </div>



                                </div>

                                <div className="register__second__step__section">

                                    <h4>Datos de Contacto</h4>
                                    <div className="input-container">
                                        <label
                                            className="input-label"
                                            htmlFor="phone">
                                            Telefono
                                            <span className="tip-text"> (Opcional)</span>
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
                                            <span className="tip-text"> (Opcional)</span>
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


                                    <div
                                        className="input-container"
                                    >
                                        <label
                                            className="input-label"
                                            htmlFor="description">
                                            Cuenta al mundo sobre ti!
                                            <span className="tip-text"> (Opcional)</span>
                                        </label>

                                        <Controller
                                            name="description"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <JoditEditor
                                                    ref={editor}
                                                    value={field.value}
                                                    onBlur={field.onBlur}
                                                    onChange={(content) => field.onChange(content)}
                                                />
                                            )}
                                        />
                                        {errors.description?.message && (
                                            <ErrorMessage message={errors.description?.message} />
                                        )}

                                        {errors.description?.message && <ErrorMessage message={errors.description?.message} />}

                                    </div>

                                    <BgButton
                                        title={"Completar Registro"}
                                        type="submit"
                                        disabled={!isValid}
                                    />
                                </div>
                            </div>
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