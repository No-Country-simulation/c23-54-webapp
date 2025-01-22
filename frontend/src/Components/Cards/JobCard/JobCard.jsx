
import { UserRound, MapPin, Laptop, Share2 } from "lucide-react";
import BgButton from "../../BgButton/BgButton";

const JobCard = ({
    JobOffer
}) => {

    return (
        <div className="offer__card__container"
            key={JobOffer.ID_offer}
        >
            <div className="offer__card__general__info">

                <h6>{JobOffer.title}</h6>

                <div className="offer__card__general__info__extra">
                    <div className="offer__item__info">
                        <UserRound
                            className="card__offer__icon"
                        />
                        <p>{JobOffer.author.name}</p>
                    </div>
                    <div className="offer__item__info">
                        <MapPin
                            className="card__offer__icon"

                        />
                        <p>{JobOffer.location}</p>
                    </div>
                    <div className="offer__item__info">
                        <Laptop
                            className="card__offer__icon"

                        />
                        <p>{JobOffer.modality}</p>
                    </div>
                </div>
            </div>

            <div className="divider-y"></div>

            <div className="offer__card__description__info">
                <p>{JobOffer.description}</p>

                <div className="offer__card_description__buttons">


                    <div className="share__icon">
                        <Share2
                            className=""
                        />
                    </div>


                    <BgButton
                        onClick={console.log(JobOffer.ID_offer)}
                        title={"Solicitar"}
                    />
                </div>
            </div>
        </div>
    )
}


export default JobCard;