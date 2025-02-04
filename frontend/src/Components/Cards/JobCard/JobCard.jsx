
import { UserRound, MapPin, Laptop, Share2 } from "lucide-react";
import BgButton from "../../BgButton/BgButton";
import { useNavigate } from "react-router-dom";

const JobCard = ({ JobOffer }) => {

    const navigate = useNavigate();

    const stripHtml = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.innerText || div.textContent || "";
    }


    const redirectToOfferPage = (ID_offer) => {
        navigate(`/ver/oferta_trabajo/${ID_offer}`)
    }


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
                        <p>{JobOffer.User?.name}</p>
                    </div>
                    <div className="offer__item__info">
                        <MapPin
                            className="card__offer__icon"

                        />
                        <p>{JobOffer.City?.name}</p>
                    </div>
                    <div className="offer__item__info">
                        <Laptop
                            className="card__offer__icon"

                        />
                        <p>{JobOffer.Modality?.name}</p>

                    </div>
                </div>
            </div>

            <div className="divider-y"></div>

            <div className="offer__card__description__info">
                {/* Si se guarda sin etiqueta <p>{JobOffer.description}</p> */}
                <div dangerouslySetInnerHTML={{ __html: JobOffer.description }} /> 
                

                <div className="offer__card_description__buttons">


                    <div className="share__icon">
                        <Share2
                            className=""
                        />
                    </div>

                    <BgButton
                        onClick={() => redirectToOfferPage(JobOffer.ID_offer)}
                        title={"Solicitar"}
                    />
                </div>
            </div>
        </div>
    )
}


export default JobCard;