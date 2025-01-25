import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Logo, ProfileIcon} from '../../Assets'
import PerfilModal from '../PerfilModal/PerfilModal';
import NotificacionesModal from '../Notificaciones/Notificaciones';


const Navbar = () => {

    const [url, setUrl] = useState('')
    useEffect(() => {
        const path = window.location.pathname.split('/')[1];
        setUrl(path);
    }, [])
    return (
        <div className='bg-Secondary d-flex  justify-content-between '>
            <div className='col-6 d-flex align-items-center'>
                <img src={Logo} className='m-3 d-none d-sm-block' width='35%' ></img>
                <Link to='/home' className={`PrimaryText text-decoration-none mx-2 ${url == 'home' ? 'fw-bold' : ''} fs-6 fs-md-5  `} >Inicio</Link>
                <Link to='/postulaciones' className={`PrimaryText text-decoration-none mx-2 ${url == 'postulaciones' ? 'fw-bold' : ''} fs-6 fs-md-5 `} >Postulaciones</Link>
            </div>

            <div className='d-flex justify-content-end align-items-center col-6'>
                <NotificacionesModal />
                {/* CAMBIAR 'MAURO SEBASTIAN' POR EL NOMBRE DEL USUARIO LOGUEADO */}
                <p className='p-0 mx-3 my-0 '>Mauro Sebastian</p>
                <img src={ProfileIcon} className='rounded-circle ' style={{maxWidth: '50px'}} width='20%' ></img>
                <PerfilModal />
            </div>
        </div>
    )
}

export default Navbar