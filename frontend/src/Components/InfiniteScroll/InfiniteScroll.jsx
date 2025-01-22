import { useEffect, useState } from "react";
import JobCard from "../Cards/JobCard/JobCard";

const InfiniteScroll = ({
    cards
}) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 10;

    useEffect(() => {
        loadMoreCards();
    }, []);

    const loadMoreCards = () => {
        const nextCards = cards.slice(
            (currentPage - 1) * CARDS_PER_PAGE,
            currentPage * CARDS_PER_PAGE
        );
        setVisibleCards((prev) => [...prev, ...nextCards]);
        setCurrentPage((prev) => prev + 1);

        if (visibleCards.length + nextCards.length >= cards.length) {
            setHasMore(false);
        }
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
    }, [hasMore]);

    return (
        <>
            {visibleCards && visibleCards.map((offer, index) => (

                <>
                    <JobCard key={index}
                        JobOffer={offer}
                    />

                    <div className='divider-x'>

                    </div>

                    {!hasMore && <p>No hay más ofertas para mostrar.</p>}

                </>


            ))}
        </>
    )
}

export default InfiniteScroll;