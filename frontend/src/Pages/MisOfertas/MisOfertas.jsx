import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import InfiniteScroll from '../../Components/InfiniteScroll/InfiniteScroll';
import SearchHomeContainer from '../../Components/FilterBar/SearchHomeContainer';
import UseOffers from '../../Hooks/RecluterOffers/Offers'
import BgButton from '../../Components/BgButton/BgButton';
import { AuthContext } from '../../Context/AuthContext';
import { FetchOffersService } from '../../Services/FetchOffersService';
import JobCard from '../../Components/Cards/JobCard/JobCard';

const MisOfertas = () => {

    const [offers, setOffers] = useState([]);
    // const {FetchallOffers} = UseOffers();

    const { idUser } = useContext(AuthContext);
    console.log(idUser)
 
    useEffect(() => {

        const fetchOffers = async () => {
            if (!idUser) {
                console.log("No hay usuario autenticado.");
                return; 
            }
            const ofertas = await FetchOffersService(idUser);
            setOffers(ofertas);
        //     try {
        //         const data = await FetchallOffers(idUser);
        //         console.log("Ofertas obtenidas:", data)
        //         setOffers(data)
        //     } catch (error) {
        //         console.error("Error al obtener ofertas:", error);
        //     }
        };

    fetchOffers();

    }, []);

    return (
        <div className='Contenido'>
            <nav><Navbar /></nav>
            <main className='page__container'>
                <SearchHomeContainer />
                <div className='page__container__template home__container'>
                    
                    {offers.length > 0 ? (
                        offers.map((offer) => <JobCard JobOffer={offer} />)
                    ) : (
                        <p>No hay ofertas disponibles</p>
                    )}
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