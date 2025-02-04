import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { JobOffersService } from "../../Services/JobOffersService";
import { Laptop, MapPin, UserRound } from "lucide-react";
import UseJobApplication from "../../Hooks/JobApplication/UseJobApplication";
import Navbar from "../../Components/Navbar/Navbar";
import AlertToast from "../../Components/Alerts/Toasts/AlertToast";


const SingleJobOffer = () => {

    const { ID_offer } = useParams();
    const { getOfferById } = JobOffersService();
    const [singleOffer, setSingleOffer] = useState();

    const { applyjob, error } = UseJobApplication();
    useEffect(() => {

        const getData = async (ID_offer) => {

            const response = await getOfferById(ID_offer)

            if (response.status === 400 || response.status === 403) {
                return
            }

            setSingleOffer(response.data)
        }

        getData(ID_offer)
    }, [ID_offer])


    return (
        <div className="Contenido">
            <nav><Navbar /> </nav>

            <div className="page__container">
                <div className="page__container__template">
                    <div className="offer__card__general__info">
                        <h6>{singleOffer?.title}</h6>
                    </div>

                    {/* INFO EXTRA */}
                    <div className="offer__card__general__info__extra">
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

                    {/* FIN INFO EXTRA */}
                    {error &&
                        <>
                            <AlertToast  message_toast='Ya has enviado tu postulación'></AlertToast>
                        </>
                    }
                    <div className="offer__card__description__info">
                        <p dangerouslySetInnerHTML={{ __html: singleOffer?.description }} />
                    </div>
                    <button className="bg-Primary btn-aplicar m-1 text-white" onClick={() => (applyjob(ID_offer))}>
                        Aplicar
                    </button>

                </div>
            </div>

        </div>
    )
}


export default SingleJobOffer;