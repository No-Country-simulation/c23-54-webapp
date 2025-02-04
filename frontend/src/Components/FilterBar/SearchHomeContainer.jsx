import { MapPin, Search } from "lucide-react"
import BgButton from "../BgButton/BgButton"
import SearchText from "./SearchText"
import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"


const SearchHomeContainer = ({ SetFilterName, SetlocationFilter }) => {
    const { Role } = useContext(AuthContext)


    const navigate = useNavigate();

    const handleCreateOffer = () => {

        navigate('/crear/oferta_trabajo')
    }
    return (
        <div
            className='search__container'
        >
            <div className='offers__search__container'>
                <SearchText
                    name={"title"}
                    placeholder={"Buscar por titulo"}
                    funcSaveValue={(e) => SetFilterName(e.target.value)}
                >

                    <Search
                        className='card__offer__icon'
                    />

                </SearchText>

                <SearchText
                    name={"location"}
                    placeholder={"Buscar por ubicación"}
                    funcSaveValue={(e) => SetlocationFilter(e.target.value)}

                >

                    <MapPin
                        className='card__offer__icon'
                    />

                </SearchText>
            </div>


            {Role === 2 && (
                <BgButton
                    title={"Agregar Oferta"}
                    onClick={handleCreateOffer}
                />
            )}

            {

                // EL BOTON HAY QUE HACER EL RENDERIZADO SEGUN EL ROL

            }

        </div>
    )
}

export default SearchHomeContainer