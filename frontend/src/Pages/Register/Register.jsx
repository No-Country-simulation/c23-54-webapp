import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';
import { yupResolver } from "@hookform/resolvers/yup";
import OutlinedButton from "../../Components/OutlinedButton/OutlinedButton"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from "yup";
import Logo from '../../Assets/icons/Logo.png';

import AlertToast from "../../Components/Alerts/Toasts/AlertToast";
import SuccessToast from "../../Components/Alerts/Toasts/SuccessToast";
import RegisterFirstStep from "./FirstStep";
import RegisterSecondStep from "./SecondStep";


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

    const [isLoading, setIsLoading] = useState(false);
    const [showAlertToast, setShowALertToast] = useState(false);

    const [showSuccessToast, setSuccessALertToast] = useState(false);
    const [messageToast, setMessageToast] = useState("");


    
    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(currentStep === 1 ? registerSchemaStepOne : registerSchemaStepTwo),
        mode: "onChange",
    });

    const goToNextStep = (data) => {
        setFormData(data)
        setCurrentStep(2);
        methods.reset();
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
        methods.reset();
        navigate('/login')
    }

    console.log(formData)

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

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(currentStep === 1 ? goToNextStep : finalStepSubmit)}
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

                        {currentStep === 1 &&
                            <RegisterFirstStep />
                        }

                        {currentStep === 2 &&
                            <RegisterSecondStep
                                setShowALertToast={setShowALertToast}
                                setMessageToast={setMessageToast}
                                setIsLoading={setIsLoading}
                            />
                        }

                    </div>

                    <div className="register__footer padding-template">
                        <img src={Logo} alt="Logo" />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default Register