import JoditEditor from "jodit-react";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessage from "../../Components/Alerts/ErrorMessage/ErrorMessage";
import BgButton from "../../Components/BgButton/BgButton";
import { useEffect, useRef, useState } from "react";


const RegisterSecondStep = ({
    setIsLoading,
    setShowALertToast,
    setMessageToast,

}) => {

    const { register, formState: { errors, isValid, }, control } = useFormContext();
    const editor = useRef(null);


    const [citiesList, setCitiesList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [rolesList, setRolesList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);


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
    )
}

export default RegisterSecondStep;