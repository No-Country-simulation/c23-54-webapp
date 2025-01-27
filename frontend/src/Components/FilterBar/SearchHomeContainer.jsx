import { MapPin, Search } from "lucide-react"
import BgButton from "../BgButton/BgButton"
import SearchText from "./SearchText"


const SearchHomeContainer = () => {

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
            />
        </div>
    )
}

export default SearchHomeContainer