
import { useFormContext } from "react-hook-form"
import ErrorMessage from "../../Components/Alerts/ErrorMessage/ErrorMessage";
import BgButton from "../../Components/BgButton/BgButton";

const RegisterFirstStep = () => {
    const { register, formState: { errors, isValid } } = useFormContext();

    return (

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
}

export default RegisterFirstStep;