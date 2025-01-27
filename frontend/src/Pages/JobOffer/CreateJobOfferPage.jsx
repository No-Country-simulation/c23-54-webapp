import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import ErrorMessage from "../../Components/Alerts/ErrorMessage/ErrorMessage";
import { Calendar, Laptop, Laptop2, List, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ModalityService } from "../../Services/ModalityService";
import { CityService } from "../../Services/CityService";
import { jobCategoriesService } from "../../Services/JobCategoriesService";
import JoditEditor from "jodit-react";
import BgButton from "../../Components/BgButton/BgButton";



const createJobOffer = yup.object().shape({
    title: yup
        .string()
        .required("El titulo es obligatorio"),
    description: yup
        .string()
        .required("La descripción es obligatoria")
        .max(366, "La cantidad maxima de caracteres debe ser 366"),
    salary_range_min: yup
        .number()
        .typeError("El salario debe expresarse en numeros")
        .required("El salario minimo es obligatorio"),
    salary_range_max: yup
        .number()
        .typeError("El salario debe expresarse en numeros")
        .required("El salario maximo es obligatorio"),
    deadline: yup
        .date()
        .typeError("El tiempo de finalización debe ser una fecha valida")
        .min(new Date(), "La fecha de finalización debe ser posterior a hoy"),
    ID_city: yup
        .number()
        .typeError("Debe ser una ciudad valida")
        .required("La ciudad es obligatoria"),
    ID_modality: yup
        .number()
        .typeError("Debe ser una modalidad valida")
        .required("La modalidad es obligatoria"),
    ID_job_category: yup
        .number()
        .typeError("Debe ser una categoria valida")
        .required("La categoria es obligatoria")
})
const CreateJobOfferPage = () => {

    const { handleSubmit, register, formState: { errors }, control } = useForm({
        resolver: yupResolver(createJobOffer),
        mode: "all"
    })

    const { getAllModalities } = ModalityService()
    const { getAllCities } = CityService()
    const { getAllJobCategories } = jobCategoriesService()

    const [modalities, setModalities] = useState([]);
    const [cities, setCities] = useState([]);
    const [jobCategories, setJobCategories] = useState([]);

    useEffect(() => {
        const getDataSelects = async () => {

            const modalitiesData = await getAllModalities()
            setModalities(modalitiesData);

            const citiesData = await getAllCities()
            setCities(citiesData)

            const jobCategoriesList = await getAllJobCategories()
            setJobCategories(jobCategoriesList)
        }

        getDataSelects()

    }, [])


    const editor = useRef(null);

    return (

        <div
            className="page__container">


            <form
                className="page__container__template"
                onSubmit={handleSubmit(() => console.log('Hola'))}
            >

                <div className="input-container">

                    <input
                        className="create__offer__title"
                        type="text"
                        {...register("title")}
                        placeholder="Ingrese un titulo"
                    />

                    {errors && errors.title?.message && (
                        <ErrorMessage
                            message={errors.title?.message}
                        />
                    )}

                </div>

                <div className="offer__extra__info__container">

                    <div className="item__container__size">
                        <div className="offer__extra__item">
                            <Laptop
                                className="text-blue"
                            />

                            <select className="input-field"
                                {...register("ID_modality")}
                            >
                                <option value={null}>Seleccione una modalidad</option>
                                {modalities.map((modality) => (
                                    <option
                                        value={modality.ID_modality}
                                    >
                                        {modality.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {errors && errors.ID_modality?.message && (
                                <ErrorMessage
                                    message={errors.ID_modality?.message}
                                />
                            )}
                        </div>

                    </div>

                    <div className="item__container__size">
                        <div className="offer__extra__item">
                            <MapPin
                                className="text-blue"
                            />

                            <select className="input-field"
                                {...register("ID_city")}
                            >
                                <option value={null}>Seleccione una ciudad</option>
                                {cities.map((city) => (
                                    <option
                                        value={city.ID_city}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {errors && errors.ID_city?.message && (
                                <ErrorMessage
                                    message={errors.ID_city?.message}
                                />
                            )}
                        </div>


                    </div>

                    <div className="item__container__size">

                        <div className="offer__extra__item">
                            <List
                                className="text-blue"
                            />

                            <select className="input-field"
                                {...register("ID_job_category")}
                            >
                                <option value={null}>Seleccione una categoria</option>
                                {jobCategories.map((category) => (
                                    <option
                                        value={category.ID_job_category}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {errors && errors.ID_job_category?.message && (
                                <ErrorMessage
                                    message={errors.ID_job_category?.message}
                                />
                            )}
                        </div>
                    </div>

                </div>

                <div className="offer__extra__info__container">
                    <div className="item__container__size">

                        <div className="offer__extra__item">
                            <label htmlFor="deadline">
                                Disponible hasta:
                            </label>

                            <input type="date"
                                className="input-field"
                                placeholder="Fecha de Finalización"
                                {...register("deadline")}
                            />
                        </div>

                        <div>
                            {errors && errors.deadline?.message && (
                                <ErrorMessage
                                    message={errors.deadline?.message}
                                />
                            )}
                        </div>
                    </div>
                </div>


                <div className="offer__body__info__container">

                    <h4 className="">Ingrese una descripción</h4>

                    <div>
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

                    </div>


                    <div className="offer__extra__info__container">
                        <div className="item__container__size">

                            <div className="offer__extra__item">
                                <label htmlFor="salary_range_min">
                                    Rango minimo
                                </label>

                                <input type="number"
                                    className="input-field"
                                    placeholder="$1"
                                    {...register("salary_range_min")}
                                />
                            </div>

                            <div>
                                {errors && errors.salary_range_min?.message && (
                                    <ErrorMessage
                                        message={errors.salary_range_min?.message}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="item__container__size">

                            <div className="offer__extra__item">
                                <label htmlFor="salary_range_max">
                                    Rango maximo
                                </label>

                                <input type="number"
                                    className="input-field"
                                    placeholder="$1"
                                    {...register("salary_range_max")}
                                />
                            </div>

                            <div>
                                {errors && errors.salary_range_max?.message && (
                                    <ErrorMessage
                                        message={errors.salary_range_max?.message}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="create__job__button__container">
                    <BgButton
                    title={"Crear Oferta"}
                    />
                </div>
            </form>


        </div>

    )
}

export default CreateJobOfferPage;