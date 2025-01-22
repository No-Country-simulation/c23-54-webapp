import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { AuthContext } from '../../Context/AuthContext'
import { useLocation } from 'react-router-dom';
import SuccessToast from '../../Components/Alerts/Toasts/SuccessToast';
import JobCard from '../../Components/Cards/JobCard/JobCard';
import InfiniteScroll from '../../Components/InfiniteScroll/InfiniteScroll';
import { jobsOffers } from '../../Hooks/CardService/UseJobOffers';
import SearchText from '../../Components/FilterBar/SearchText';
import { MapPin, Pin, Search } from 'lucide-react';
import BgButton from '../../Components/BgButton/BgButton';
import SearchHomeContainer from '../../Components/FilterBar/SearchHomeContainer';

const Home = () => {

  const location = useLocation();

  const { logged, message } = location.state || {};

  const firstloged = localStorage.getItem('FirstLogin')
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (logged && firstloged === 'Logeado') {
      setShowToast(true);
      localStorage.removeItem('FirstLogin');
    }
  }, [logged, firstloged]);


  return (
    <div className='Contenido'>

      <nav><Navbar /></nav>

      <main className='page__container'>
        {showToast && (
          <SuccessToast message_toast={message} />
        )}

        <SearchHomeContainer />

        <div className='page__container__template home__container'>

          {jobsOffers && jobsOffers.length > 0 ? (
            <InfiniteScroll
              cards={jobsOffers}
            />
          ) :
            (
              <p>No hay ofertas de empleo </p>
            )
          }

        </div>

      </main >
    </div >
  )
}

export default Home