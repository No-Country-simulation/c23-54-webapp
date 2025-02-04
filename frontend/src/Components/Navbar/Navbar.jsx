import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Logo, ProfileIcon } from '../../Assets'
import PerfilModal from '../PerfilModal/PerfilModal';
import NotificacionesModal from '../Notificaciones/Notificaciones';
import { AuthContext } from '../../Context/AuthContext';



const Navbar = () => {

    const { Name, idUser, Role} = useContext(AuthContext);
    const [url, setUrl] = useState('')

    useEffect(() => {
        const path = window.location.pathname.split('/')[1];
        setUrl(path);

    }, [])

    return (
        <div className='bg-Secondary d-flex  justify-content-between '>
            <div className='col-6 d-flex align-items-center'>
                <img src={Logo} className='m-3 d-none d-sm-block' width='35%' ></img>
                <Link to='/Home' className={`PrimaryText text-decoration-none mx-2 ${url == 'Home' ? 'fw-bold' : ''} fs-6 fs-md-5  `} >Inicio</Link>
                <Link to='/Postulaciones' className={`PrimaryText text-decoration-none mx-2 ${url == 'Postulaciones' ? 'fw-bold' : ''} fs-6 fs-md-5 `} >Postulaciones</Link>
                {Role == 2 && (<Link to='/MisOfertas' className={`PrimaryText text-decoration-none mx-2 ${url == 'MisOfertas' ? 'fw-bold' : ''} fs-6 fs-md-5 `} >Mis Ofertas</Link>)}
            </div>

            <div className='d-flex justify-content-end align-items-center col-6'>
                {idUser && <NotificacionesModal userId={idUser} />}
                <p className='p-0 mx-3 my-0 '>{Name}</p>
                <img src={ProfileIcon} className='rounded-circle ' style={{ maxWidth: '50px' }} width='20%' ></img>
                <PerfilModal />
            </div>
        </div>
    )
}

export default Navbar