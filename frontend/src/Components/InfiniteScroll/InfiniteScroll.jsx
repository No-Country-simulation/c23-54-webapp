import { useEffect, useState, useRef } from "react";
import JobCard from "../Cards/JobCard/JobCard";

const InfiniteScroll = ({ cards }) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 10;
    const loadedCardIds = useRef(new Set()); 

    useEffect(() => {
        // Cargar las primeras tarjetas al montar el componente
        loadMoreCards();
    }, []);

    const loadMoreCards = () => {
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = currentPage * CARDS_PER_PAGE;

        // Obtener las tarjetas adicionales
        const nextCards = cards.slice(startIndex, endIndex);

        // Filtrar las tarjetas que ya han sido cargadas
        const newCards = nextCards.filter(card => !loadedCardIds.current.has(card.ID_offer));

        if (newCards.length === 0) {
            setHasMore(false);
            return;
        }

        newCards.forEach(card => loadedCardIds.current.add(card.ID_offer));

        setVisibleCards(prev => [...prev, ...newCards]);
        setCurrentPage(prev => prev + 1);
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
            {visibleCards.map((offer) => (
                <div key={offer.ID_offer}>
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
