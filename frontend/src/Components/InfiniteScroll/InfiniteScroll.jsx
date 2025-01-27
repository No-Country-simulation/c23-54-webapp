import { useEffect, useState } from "react";
import JobCard from "../Cards/JobCard/JobCard";

const InfiniteScroll = ({ cards }) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 10;

    useEffect(() => {
        // Cargar las primeras tarjetas al montar el componente
        loadMoreCards();
    }, []);

    const loadMoreCards = () => {
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = currentPage * CARDS_PER_PAGE;

        // Obtener las tarjetas adicionales
        const nextCards = cards.slice(startIndex, endIndex);

        // Verificar si hay más tarjetas para cargar
        if (nextCards.length === 0) {
            setHasMore(false);
            return;
        }

        setVisibleCards((prev) => [...prev, ...nextCards]);
        setCurrentPage((prev) => prev + 1);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                hasMore
            ) {
                loadMoreCards();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hasMore, cards, currentPage]);

    return (
        <>
            {visibleCards.map((offer, index) => (
                <div key={index}>
                    <JobCard JobOffer={offer} />
                    <div className="divider-x"></div>
                </div>
            ))}

            <div className="center">
                
                {// HABRIA QUE AGREGAR UN SPINNER/LOADER
                }
                {!hasMore && <p>No hay más ofertas para mostrar.</p>}

            </div>
        </>
    );
};

export default InfiniteScroll;
