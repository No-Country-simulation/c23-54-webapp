import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { JobOffersService } from "../../Services/JobOffersService";
import { Calendar, CircleDollarSign, Laptop, MapPin, User, UserRound } from "lucide-react";
import UseJobApplication from "../../Hooks/JobApplication/UseJobApplication";
import Navbar from "../../Components/Navbar/Navbar";
import AlertToast from "../../Components/Alerts/Toasts/AlertToast";
import Loader from "../../Components/Loader/Loader";
import { AuthContext } from "../../Context/AuthContext";


const SingleJobOffer = () => {

    const { ID_offer } = useParams();
    const { getOfferById } = JobOffersService();
    const [singleOffer, setSingleOffer] = useState();

    const { Role, idUser } = useContext(AuthContext)

    const { applyjob, error } = UseJobApplication();

    const [isLoading, setIsLoading] = useState(true)
    const [errorLoading, setErrorLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const ApplicationsList = lazy(() => import('../../Components/ApplicationsTable/ApplicationsList'));

    useEffect(() => {
        const getData = async (ID_offer) => {
            if (isLoading) {
                const response = await getOfferById(ID_offer)

                if (response.status === 400 || response.status === 403) {
                    setIsLoading(false);
                    setErrorLoading(true);
                    setErrorMessage("Ha ocurrido un error al cargar la oferta de empleo, intente nuevamente más tarde")
                    return
                }

                setIsLoading(false);
                setSingleOffer(response.data)
            }

        }

        getData(ID_offer)
    }, [ID_offer])

    const formatDate = (dateToFormat) => {
        const date = new Date(dateToFormat);

        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    console.log(singleOffer)

    return (
        <>
            <nav><Navbar /> </nav>

            {!isLoading ? (
                <div className="page__container single__offer__main__container">

                    <div className="page__container__template single__offer">
                        <div className="offer__card__general__info">
                            <h6>{singleOffer?.title}</h6>
                        </div>

                        {/* INFO EXTRA */}
                        <div className="offer__info__container">

                            <div className="offer__info__primary">
                                <div className="offer__item__info">
                                    <UserRound
                                        className="card__offer__icon"
                                    />
                                    <p>{singleOffer?.User.name}</p>
                                </div>
                                <div className="offer__item__info">
                                    <MapPin
                                        className="card__offer__icon"

                                    />
                                    <p>{singleOffer?.City.name}</p>
                                </div>
                                <div className="offer__item__info">
                                    <Laptop
                                        className="card__offer__icon"
                                    />
                                    <p>{singleOffer?.Modality.name}</p>

                                </div>
                            </div>

                            <div className="offer__info__secondary">
                                <div className="offer__item__info">
                                    <Calendar
                                        className="card__offer__icon"
                                    />
                                    <p>Disponible hasta: {formatDate(singleOffer?.deadline)}</p>
                                </div>

                            </div>

                        </div>

                        {/* FIN INFO EXTRA */}

                        <div className="offer__description">
                            <p dangerouslySetInnerHTML={{ __html: singleOffer?.description }} />
                        </div>

                        <div className="offer__card__range__salary">


                            <div className="offer__item__info">

                                <CircleDollarSign
                                    className="card__offer__icon"
                                />
                                Rango Salarial Disponible:
                                <p className="bold">
                                    {`${singleOffer?.salary_range_min}/${singleOffer?.salary_range_max}`}
                                </p>
                            </div>


                        </div>

                        {error &&
                            <>
                                <AlertToast message_toast='Ya has enviado tu postulación'></AlertToast>
                            </>
                        }


                        {errorLoading && (
                            <AlertToast
                                message_toast={errorMessage}
                            />
                        )}

                        {
                            (Role === 3 && (
                                <div className="button__container">
                                    <button className="bg-Primary btn-aplicar m-1 text-white" onClick={() => (applyjob(ID_offer))}>
                                        Aplicar
                                    </button>
                                </div>
                            ))
                        }



                    </div>

                    {/* UNCOMMENT CUANDO AGREGUEN EL ID DE USUARIO EN LA REPSUESTA */}

                    {Role === 2 && idUser === singleOffer?.User.ID_user && (
                        <>
                            <Suspense fallback={<Loader message='Cargando Postulantes' />}>
                                <ApplicationsList ID_offer={ID_offer} />
                            </Suspense>

                        </>
                    )}

                   
                    {/* {Role === 2 &&
                        <>
                            <Suspense fallback={<Loader message='Cargando Postulantes' />}>
                                <ApplicationsList ID_offer={ID_offer} />
                            </Suspense>

                        </>
                    } */}
                </div >
            ) :
                <Loader />
            }
        </>
    )
}


export default SingleJobOffer;