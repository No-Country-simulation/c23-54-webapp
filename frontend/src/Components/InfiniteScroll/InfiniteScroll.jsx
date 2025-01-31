import { useEffect, useState } from "react";
import JobCard from "../Cards/JobCard/JobCard";

const InfiniteScroll = ({ cards }) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const CARDS_PER_PAGE = 10;

    useEffect(() => {
        if (cards.length > 0) {
            loadMoreCards();
        }
    }, [cards]); // Se ejecuta cuando 'cards' cambia

    const loadMoreCards = () => {
        if (isLoading) return; // Evita llamadas duplicadas
        setIsLoading(true);

        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = currentPage * CARDS_PER_PAGE;
        const nextCards = cards.slice(startIndex, endIndex);

        if (nextCards.length === 0) {
            setHasMore(false);
        } else {
            setVisibleCards((prev) => [...prev, ...nextCards]);
            setCurrentPage((prev) => prev + 1);
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
            {visibleCards.map((offer, index) => (
                <div key={index}>
                    <JobCard JobOffer={offer} />
                    <div className="divider-x"></div>
                </div>
            ))}

            <div className="center">
                {isLoading && <p>Cargando más ofertas...</p>}
                {!hasMore && <p>No hay más ofertas para mostrar.</p>}
            </div>
        </>
    );
};

export default InfiniteScroll;
