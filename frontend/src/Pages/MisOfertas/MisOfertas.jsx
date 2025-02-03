import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import InfiniteScroll from '../../Components/InfiniteScroll/InfiniteScroll';
import SearchHomeContainer from '../../Components/FilterBar/SearchHomeContainer';
import UseOffers from '../../Hooks/RecluterOffers/Offers'
import BgButton from '../../Components/BgButton/BgButton';

const MisOfertas = () => {

    const [offers, setOffers] = useState([]);
    const {FetchallOffers} = UseOffers();

    useEffect(() => {

        const fetchOffers = async () => {
        try {
            const data = await FetchallOffers();
            setOffers(data)
        } catch (e) {
        }
        }

    fetchOffers();

    }, [])

    return (
        <div className='Contenido'>

        <nav><Navbar /></nav>

        <main className='page__container'>
            <SearchHomeContainer />
            <div className='page__container__template home__container'>
            {offers && offers.length > 0 ? (
                <InfiniteScroll
                cards={offers}
                />
            ) :
                (
                <p>No hay ofertas de empleo publicadas por ti.</p>
                )
            }
            </div>
            <div className="offer__card_description__buttons">
                <BgButton
                            onClick={() => (console.log("Crear oferta"))}
                            title={"Crear una nueva oferta"}
                />
            </div>
        </main >
        </div >
    )
}
export default MisOfertas