import { useState, useEffect, useRef } from 'react';
import { CircleCheckBig } from 'lucide-react';

const SuccessToast = ({ message_toast }) => {
    const [isVisible, setIsVisible] = useState(true);
    const toastRef = useRef(null);  // Creas la referencia

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isVisible && toastRef.current) {
            
            const timer = setTimeout(() => {
                toastRef.current.classList.add('fade-out');
            }, 100); 

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div ref={toastRef} className="toast__container toast__alert__success">
            <div className="toast__icon">
                <CircleCheckBig color="#2be744" />
            </div>
            <div className="toast__text">
                <p className="success-message">{message_toast}</p>
            </div>
        </div>
    );
};

export default SuccessToast;
