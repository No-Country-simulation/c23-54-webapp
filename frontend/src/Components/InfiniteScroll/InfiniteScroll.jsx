import { useEffect, useState, useRef } from "react";
import JobCard from "../Cards/JobCard/JobCard";

const InfiniteScroll = ({ cards }) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const CARDS_PER_PAGE = 10;
    const loadedCardIds = useRef(new Set()); 

    useEffect(() => {
        if (cards.length > 0) {
            loadMoreCards();
        }
    }, [cards]); // Se ejecuta cuando 'cards' cambia

    const loadMoreCards = () => {
        if (isLoading) return;
        setIsLoading(true);
    
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = currentPage * CARDS_PER_PAGE;
        const nextCards = cards.slice(startIndex, endIndex);
    
        // Filtrar solo las nuevas tarjetas que aún no han sido cargadas
        const newCards = nextCards.filter(card => !loadedCardIds.current.has(card.ID_offer));
    
        if (newCards.length === 0) {
            setHasMore(false);
        } else {
            setVisibleCards(prev => [...prev, ...newCards]);
            newCards.forEach(card => loadedCardIds.current.add(card.ID_offer));
            setCurrentPage(prev => prev + 1);
        }
    
        setIsLoading(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                hasMore &&
                !isLoading
            ) {
                loadMoreCards();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, isLoading]);

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
