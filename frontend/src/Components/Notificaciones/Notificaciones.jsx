import React, { useState, useEffect, useContext, useRef } from "react";
import { Bell } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { jobApplicationService } from "../../Services/jobApplicationService";
import "./Notificaciones.css";

const Notificaciones = ({ isOpen, notificaciones, anchorRef }) => {
    if (!isOpen) return null;

    const modalStyles = anchorRef?.current
        ? {
            position: "absolute",
            top: 48,
            left: -150,
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "180px",
        }
        : {};

    return (
        <div
            className="noti-modal-container"
            style={modalStyles}
            onClick={(e) => e.stopPropagation()}
        >
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

const NotificacionesModal = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const prevNotificacionesRef = useRef([]);
    const buttonRef = useRef(null);
    const { idUser } = useContext(AuthContext);
    const { MyapplicationsService } = jobApplicationService();


    const handleOpenProfile = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            buttonRef.current &&
            !buttonRef.current.contains(event.target) &&
            !event.target.closest(".noti-modal-container")
        ) {
            setIsProfileOpen(false);
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
                const response = await MyapplicationsService(idUser);
                // console.log("Solicitudes del usuario:", data);
                const data = await response.json();
                const nuevasNotificaciones = data.map(
                    (solicitud) =>
                        `Actualización de Postulación #${solicitud.JobOffer?.ID_offer}: Estado (${solicitud.ApplicationStatus?.status})`
                );

                // Solo actualizar si hay cambios
                if (JSON.stringify(nuevasNotificaciones) !== JSON.stringify(prevNotificacionesRef.current)) {
                    setNotificaciones(nuevasNotificaciones);
                    prevNotificacionesRef.current = nuevasNotificaciones; 
                }
            } catch (error) {
                console.error("Error al cargar las notificaciones:", error);
            }
        };

        fetchNotificaciones();

        // Revisar cada 10 segundos
        const interval = setInterval(fetchNotificaciones, 10000);
        return () => clearInterval(interval);
    }, [idUser]);

    return (
        <div style={{ position: "relative" }}>
            <Bell
                onClick={handleOpenProfile}
                ref={buttonRef}
                style={{ cursor: "pointer", fontSize: "24px", color: "#333" }}
            />
            <Notificaciones isOpen={isProfileOpen} notificaciones={notificaciones} anchorRef={buttonRef} />
        </div>
    );
};

export default NotificacionesModal;