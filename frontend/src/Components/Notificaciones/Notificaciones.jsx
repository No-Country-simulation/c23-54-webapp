import React, { useState, useRef, useEffect } from 'react';
import './Notificaciones.css'; 
import { Bell } from 'lucide-react';

const Notificaciones = ({ isOpen, onClose, notificaciones, anchorRef }) => {
    if (!isOpen) return null;

    const modalStyles = anchorRef?.current
    ? {
        position: 'absolute',
        top: 48,
        left: -150,
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        width: '180px',
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
                    <div>
                        {notificaciones.map((notificacion, index) => (
                        <div key={index} className="notificacion-item">
                            {notificacion}
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const NotificacionesModal = ({userId: ID_user}) => {
   
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const [cantidadActualizaciones, setCantidadActualizaciones] = useState(0);
    const buttonRef = useRef(null);

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
    
    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/jobApplications/user/${ID_user}`); 
                if (!response.ok) {
                throw new Error("Error al obtener las notificaciones");
                }
                const data = await response.json();

                const nuevasNotificaciones = data.map(
                (solicitud) =>
                    `Actualización de Postulación #${solicitud.ID_offer}: Estado (${getStatusText(
                    solicitud.ID_application_status
                    )})`
                );
            setNotificaciones(nuevasNotificaciones);
            setCantidadActualizaciones(nuevasNotificaciones.length);
            } catch (error) {
                console.error("Error al cargar las notificaciones:", error);
            }
        };

        fetchNotificaciones();
        const interval = setInterval(fetchNotificaciones, 10000);
            return () => clearInterval(interval);
        }, [ID_user]);

        const getStatusText = (statusId) => {
            const estados = {
                1: "Pendiente",
                2: "Vista",
                3: "En revisión",
                4: "Aprobada",
                5: "Rechazada",
                };
                return estados[statusId] || "Desconocido";
            };

            // const timer = setTimeout(() => {
            //     setNotificaciones((prev) => [
            //         ...prev,
            //         `Actualización de Postulación #10: Estado (Aprobada)`,
            //     ]);
            //     setCantidadActualizaciones((prev) => prev + 1);
            //     }, 5000);
            
            //     const interval = setInterval(fetchNotificaciones, 15000);
            //     // Refrescar cada 15 segundos
            
            //     return () => {
            //     clearTimeout(timer);
            //     clearInterval(interval);
            //     };
            // }, [ID_user]);

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