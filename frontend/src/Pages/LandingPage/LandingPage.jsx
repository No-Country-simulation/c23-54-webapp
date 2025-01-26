import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, FileUser, LayoutList, UserCheck, Newspaper, ListOrdered } from 'lucide-react';
import { Logo, LandingPageImagen } from '../../Assets'
import './LandingPage.css'
import ConfirmarAccion from '../../Components/ConfirmarAccion/ConfirmarAccion';

const Header = ({ currentUrl }) => (
    <header className="header bg-Secondary">
    <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
    </div>
    <nav className="nav-links">
        <Link to="/Login" className={`btn-custom ${currentUrl === 'login' ? 'active' : ''}`}>Iniciar Sesión</Link>
    </nav>
    </header>
);

const Section = ({ title, icons }) => (
    <section className="section">
    <h1 className="title PrimaryColor">{title}</h1>
    <div className="icon-container">
        {icons.map(({ Icon, text }, index) => (
        <div className="icon-item" key={index}>
            <Icon size={80} color="#031D38" />
            <h1 className="text-container">
                {text.split('<br />').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i !== text.split('<br />').length - 1 && <br />}
                </React.Fragment>
                ))}
            </h1>
        </div>
        ))}
    </div>
    </section>
);

const LandingPage = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setUrl(path);
    }, []);

    const candidateIcons = [
    { Icon: Search, text: 'Explora ofertas <br /> personalizadas' },
    { Icon: FileUser, text: 'Postúlate <br /> fácilmente' },
    { Icon: LayoutList, text: 'Haz seguimiento <br /> de tus solicitudes' },
    ];

    const recruiterIcons = [
    { Icon: ListOrdered, text: 'Administra procesos <br /> eficientemente' },
    { Icon: UserCheck, text: 'Encuentra<br /> talento calificado' },
    { Icon: Newspaper, text: 'Publica ofertas<br /> en minutos' },
    ];

return (
    <>
        <Header currentUrl={url} />
        <main className="contenido">
            <section className="intro">
                <div className="intro-text">
                    <h1 className="title">Conecta con las Oportunidades Profesionales del Futuro</h1>
                    <h2 className="subtitle">Un espacio donde talento y empresas convergen para crecer juntos. Simplifica la contratación y accede a tu próxima gran oportunidad laboral</h2>
                    <Link to="/Registrarse" className={`btn-custom ${url === 'register' ? 'active' : ''}`}>Registrarse Gratis</Link>
                    <ConfirmarAccion/>
                </div>
                <div className="intro-image">
                    <img src={LandingPageImagen} alt="Landing Page" />
                </div>
                </section>
                <hr className="divider" />
            <Section title="Candidatos" icons={candidateIcons} />
            <hr className="divider" />
            <Section title="Reclutadores" icons={recruiterIcons} />
        </main>
    </>
    );
};

export default LandingPage

// ANOTACIONES
// EL CONTENIDO ES EL 64% DE LA PANTALLA
// Valor de redondeado es 5
// Padding horizontales 10, verticales 20
// Gap entre el navbar y el contenido 60