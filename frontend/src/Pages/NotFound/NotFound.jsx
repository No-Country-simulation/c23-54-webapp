import React from 'react'
import Logo from '../../Assets/icons/Logo.png'
import Notfoundicon from '../../Assets/imagenes/404.png'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'  style={{ height: '100vh' }}>
        <Link to= '/' className='text-decoration-none d-flex  justify-content-center'>
        <img src={Logo} className='w-50'></img>
        </Link>
        <img src={Notfoundicon} className='w-25 p-0 m-2'></img>

        <div className='d-flex flex-column justify-content-center align-items-center fs-5'>
        <p>Pagina no encontrada</p>

        <button className='bg-Primary px-5 py-1 border-0 rounded-3'>
        <Link to='/' className='SecondaryText text-decoration-none' >Inicio</Link>
        </button>
        </div>
    </div>
  )
}

export default NotFound