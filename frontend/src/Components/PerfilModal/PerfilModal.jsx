import React, { useContext, useEffect, useState } from 'react';
import './PerfilModal.css'; 
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProfileIcon} from '../../Assets'
import { AuthContext } from '../../Context/AuthContext';

const ProfileModal = ({ isOpen, onClose, anchorRef }) => {

    const {logout} = useContext(AuthContext);
    if (!isOpen) return null;

    const modalStyles = anchorRef?.current
    ? {
        position: 'absolute',
        top: 48,
        left: -230,
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        width: '250px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    }
    : {};

    return (
        // <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal-container" style={modalStyles}  onClick={(e) => e.stopPropagation()}>
            <ChevronUp 
                style={{ cursor: 'pointer', fontSize: '24px', color: '#333', position: 'absolute', top: '10px', right: '10px' }} 
                onClick={onClose}
            />
                <div className="profile-header">
                <img src={ProfileIcon} className='profile-picture' style={{maxWidth: '50px'}} width='20%' ></img>
                <div className="profile-info">
                    <h3>Juan Pérez</h3>
                    <h4>Desarrollo FullStack</h4>
                    <button className="view-profile-button">Ver Perfil</button>
                </div>
            </div>

            <div className="profile-manage-section">
                <h4>Gestionar Cuenta</h4>
                <ul className="profile-manage-list">
                    <li><a href="/settings" className='text-black' >Ajustes y Privacidad</a></li>
                    <li><a href="/change-password" className='text-black'>Cambiar Contraseña</a></li>
                    <li><button onClick={logout} className="logout-button p-0">Salir</button></li>
                </ul>
                </div>
            </div>
        // </div>
    );
    };

    const PerfilModal = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const buttonRef = React.useRef(null);

    const handleOpenProfile = () => {
        setIsProfileOpen(true);
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

    const handleLogout = () => {
        alert('Sesión cerrada');
        setIsProfileOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <ChevronDown 
                onClick={handleOpenProfile} 
                ref={buttonRef} 
                style={{ cursor: 'pointer', fontSize: '24px', color: '#333' }} 
            />
            <ProfileModal 
                isOpen={isProfileOpen} 
                onClose={handleCloseProfile} 
                onLogout={handleLogout} 
                anchorRef={buttonRef}
            />
        </div>
    );
};

export default PerfilModal;