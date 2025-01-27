import { MapPin, Search } from "lucide-react"
import BgButton from "../BgButton/BgButton"
import SearchText from "./SearchText"
import { useNavigate } from "react-router-dom";


const SearchHomeContainer = () => {


    const navigate = useNavigate();

    const handleCreateOffer = () =>{

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
                >

                    <Search
                        className='card__offer__icon'
                    />

                </SearchText>

                <SearchText
                    name={"location"}
                    placeholder={"Buscar por ubicación"}
                >

                    <MapPin
                        className='card__offer__icon'
                    />

                </SearchText>
            </div>


            {

                // EL BOTON HAY QUE HACER EL RENDERIZADO SEGUN EL ROL

            }
            <BgButton
                title={"Agregar Oferta"}
                onClick={handleCreateOffer}
            />
        </div>
    )
}

export default SearchHomeContainer