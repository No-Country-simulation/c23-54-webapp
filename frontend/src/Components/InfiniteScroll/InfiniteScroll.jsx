import { useEffect, useState, useRef } from "react";
import JobCard from "../Cards/JobCard/JobCard";

const InfiniteScroll = ({ cards }) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 10;
    const loadedCardIds = useRef(new Set());

    useEffect(() => {
        // Resetear estado cuando `cards` cambia  el filtro
        setVisibleCards([]);
        setHasMore(true);
        setCurrentPage(1);
        loadedCardIds.current.clear();
        loadMoreCards(1); 
    }, [cards]); 

    const loadMoreCards = (page = currentPage) => {
        const startIndex = (page - 1) * CARDS_PER_PAGE;
        const endIndex = page * CARDS_PER_PAGE;
        const nextCards = cards.slice(startIndex, endIndex);

        const newCards = nextCards.filter(card => !loadedCardIds.current.has(card.ID_offer));

        if (newCards.length === 0) {
            setHasMore(false);
            return;
        }

        newCards.forEach(card => loadedCardIds.current.add(card.ID_offer));

        setVisibleCards(prev => [...prev, ...newCards]);
        setCurrentPage(page + 1);
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
    }, [hasMore, visibleCards]);

    return (
        <>
            {visibleCards.map((offer) => (
                <div key={offer.ID_offer}>
                    <JobCard JobOffer={offer} />
                    <div className="divider-x"></div>
                </div>
            ))}

            <div className="center">
                {// Agregar un spinner o loader aquí si se necesita
                }
                {!hasMore && <p>No hay más ofertas para mostrar.</p>}
            </div>
        </>
    );
};

export default InfiniteScroll;
