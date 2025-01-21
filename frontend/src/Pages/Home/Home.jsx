import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { AuthContext } from '../../Context/AuthContext'
import { useLocation } from 'react-router-dom';
import SuccessToast from '../../Components/Alerts/Toasts/SuccessToast';

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

        <nav><Navbar/></nav>
        
        <main>
        {showToast && (
            <SuccessToast message_toast={message} />
        )}
        </main>
    </div>
  )
}

export default Home