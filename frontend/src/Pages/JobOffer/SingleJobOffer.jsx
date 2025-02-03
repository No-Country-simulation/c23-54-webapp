import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { JobOffersService } from "../../Services/JobOffersService";
import { Laptop, MapPin, UserRound } from "lucide-react";


const SingleJobOffer = () => {

    const { ID_offer } = useParams();
    const { getOfferById } = JobOffersService();
    const [singleOffer, setSingleOffer] = useState();

    useEffect(() => {

        const getData = async (ID_offer) => {

            const response = await getOfferById(ID_offer)

            if (response.status === 400 || response.status === 403) {
                console.log('error')
                return
            }

            setSingleOffer(response.data)
        }

        getData(ID_offer)
    }, [ID_offer])

    console.log(singleOffer)

    return (
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

                <div className="offer__card__description__info">
                <p dangerouslySetInnerHTML={{ __html: singleOffer?.description }} />
                </div>

            </div>
        </div>
    )
}


export default SingleJobOffer;