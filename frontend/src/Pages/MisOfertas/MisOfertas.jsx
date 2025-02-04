import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import InfiniteScroll from '../../Components/InfiniteScroll/InfiniteScroll';
import SearchHomeContainer from '../../Components/FilterBar/SearchHomeContainer';
import UseOffers from '../../Hooks/RecluterOffers/Offers'
import BgButton from '../../Components/BgButton/BgButton';
import { AuthContext } from '../../Context/AuthContext';

const MisOfertas = () => {

    const [offers, setOffers] = useState([]);
    const {FetchallOffers} = UseOffers();

    const { idUser } = useContext(AuthContext);
    console.log(idUser)

    useEffect(() => {

        const fetchOffers = async () => {
            if (!idUser) {
                console.log("⚠ No hay usuario autenticado.");
                return; 
            }
            try {
                const data = await FetchallOffers(idUser);
                console.log("Ofertas obtenidas:", data)
                setOffers(data)
            } catch (error) {
                console.error("Error al obtener ofertas:", error);
            }
        };

    fetchOffers();

    }, [idUser]);

    return (
        <div className='Contenido'>
            <nav><Navbar /></nav>
            <main className='page__container'>
                <SearchHomeContainer />
                <div className='page__container__template home__container'>
                    {offers && offers.length > 0 ? (
                        <InfiniteScroll cards={offers} />
                    ) : (
                        <p>No hay ofertas de empleo publicadas por ti.</p>
                    )};
                </div>
                <div className="offer__card_description__buttons">
                    <BgButton
                        onClick={() => (console.log("Crear oferta"))}
                        title={"Crear una nueva oferta"}
                    />
                </div>
            </main >
        </div >
    );
};
export default MisOfertas