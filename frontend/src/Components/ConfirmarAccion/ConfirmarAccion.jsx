import React, { useState } from 'react';
import './Modal.css'; 

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-container">
            <h2 className="modal-text">¿Seguro que desea aplicar?</h2>
            <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>Cancelar</button>
            <button className="apply-button" onClick={onConfirm}>Aplicar</button>
            </div>
        </div>
        </div>
    );
    };

const ConfirmarAccion = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        alert('Cambios aplicados');
        setIsModalOpen(false);
    };

    return (
        <div>
        <button className="save-button apply-button" onClick={handleOpenModal}>Guardar</button>
        <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
        />
        </div>
    );
};

export default ConfirmarAccion;