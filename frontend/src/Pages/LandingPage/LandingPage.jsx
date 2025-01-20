import React, { useEffect, useState } from 'react'
import Logo from '../../Assets/icons/Logo.png'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import LandingPageImagen from '../../Assets/imagenes/LandingPageImagen.png'
import { Search, FileUser, LayoutList, UserCheck, Newspaper, ListOrdered } from 'lucide-react';

const LandingPage = () => {
    const [url, setUrl] = useState('')
        useEffect(() => {
            const path = window.location.pathname.split('/')[1];
            setUrl(path);
        }, [])
    return (
        <div>
            <header className="header bg-Secondary">
                <div className="logo-container ">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>
                <nav className="nav-links">
                    <Link to="/Login" className={`btn-custom ${url === 'login' ? 'active' : ''}`}>Iniciar Sesión</Link>
                </nav>
            </header>
        <div className="contenido">
            <main>
                <section className="intro">
                    <div className="intro-text">
                        <h1 className="title">Conecta con las Oportunidades Profesionales del Futuro</h1>
                        <h2 className="subtitle">Un espacio donde talento y empresas convergen para crecer juntos. Simplifica la contratación y accede a tu próxima gran oportunidad laboral</h2>
                        <Link to="/Registrarse" className={`btn-2 ${url === 'register' ? 'active' : ''}`}>Registrarse Gratis</Link>
                    </div>
                    <div className="intro-image">
                        <img src={LandingPageImagen} alt="Landing Page" />
                    </div>
                    </section>
                    <hr className="divider" />
                    <section className="section">
                        <h1 className="title PrimaryColor">Candidatos</h1>
                        <div className="icon-container">
                            <div className="icon-item">
                                <Search size={80} color="#031D38" />
                                <h1 className='text-container'>Explora ofertas <br /> personalizadas</h1>
                            </div>
                            <div className="icon-item">
                                <FileUser size={80} color="#031D38" />
                                <h1 className='text-container'>Postúlate <br /> fácilmente</h1>
                            </div>
                            <div className="icon-item">
                                <LayoutList size={80} color="#031D38" />
                                <h1 className='text-container'>Haz seguimiento <br /> de tus solicitudes</h1>
                            </div>
                        </div>
                    </section>
                <hr className="divider" />
                <section className="section">
                    <h1 className="title PrimaryColor" >Reclutadores</h1>
                    <div className="icon-container">
                        <div className="icon-item">
                            <ListOrdered size={80} color="#031D38" />
                            <h1 className='text-container'>Administra procesos <br />eficientemente</h1>
                        </div>
                        <div className="icon-item">
                            <UserCheck size={80} color="#031D38" />
                            <h1 className='text-container'>Encuentra<br />talento calificado</h1>
                        </div>
                        <div className="icon-item">
                            <Newspaper size={80} color="#031D38" />
                            <h1 className='text-container'>Publica ofertas<br />en minutos</h1>
                        </div>
                    </div>
                </section>
            </main>
        </div>
        </div>
    );
};

export default LandingPage

// ANOTACIONES
// EL CONTENIDO ES EL 64% DE LA PANTALLA
// Valor de redondeado es 5
// Padding horizontales 10, verticales 20
// Gap entre el navbar y el contenido 60