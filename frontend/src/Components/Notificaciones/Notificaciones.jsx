import React, { useState, useRef, useEffect } from 'react';
import './Notificaciones.css'; 
import { Bell } from 'lucide-react';



const Notificaciones = ({ isOpen, onClose, notificaciones, anchorRef }) => {
    if (!isOpen) return null;

    const modalStyles = anchorRef?.current
    ? {
        position: 'absolute',
        top: 60,
        left: -150,
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        width: '180px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    }
    : {};

    return (
        <div className="noti-modal-container" style={modalStyles}  onClick={(e) => e.stopPropagation()}>
            <div className="noti-header">
                <div className="noti-info">
                    <h3>Notificaciones</h3>
                </div>
            </div>
            <div className="noti-manage-section">
                {notificaciones.length === 0 ? (
                    <>
                        <h4>Sin Novedades</h4>
                        <img
                        src="https://uxwing.com/wp-content/themes/uxwing/download/internet-network-technology/internet-access-icon.png"
                        alt="No-Notifications"
                        />
                    </> 
                ) : (
                    <ul>
                        {notificaciones.map((notificacion, index) => (
                        <li key={index} className="notificacion-item">
                            {notificacion}
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

    const NotificacionesModal = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const buttonRef = React.useRef(null);

    const handleOpenProfile = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            buttonRef.current &&
            !buttonRef.current.contains(event.target) &&
            !event.target.closest(".noti-modal-container")
        ) {
            handleCloseProfile();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    
    // useEffect(() => {
    //     const nuevasNotificaciones = [
    //         "Tienes un nuevo mensaje.",
    //         "Tu pedido ha sido enviado.",
    //         "Recordatorio: reunión a las 3 PM.",
    //     ];
    //     setNotificaciones(nuevasNotificaciones);
    
    // // Simular llegada de una nueva notificación después de 5 segundos
    // const timer = setTimeout(() => {
    //     setNotificaciones((prev) => [...prev, "Nueva notificación: ¡oferta especial!"]);
    // }, 5000);

    //   return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    // }, []);

    return (
        <div style={{ position: 'relative' }}>
            <Bell 
                onClick={handleOpenProfile} 
                ref={buttonRef} 
                style={{ cursor: 'pointer', fontSize: '24px', color: '#333' }} 
            />
            <Notificaciones 
                isOpen={isProfileOpen} 
                onClose={handleCloseProfile} 
                notificaciones={notificaciones}
                anchorRef={buttonRef}
            />
        </div>
    );
};

export default NotificacionesModal;