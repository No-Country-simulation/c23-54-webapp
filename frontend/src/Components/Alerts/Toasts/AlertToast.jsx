import { CircleAlert } from 'lucide-react';

const AlertToast = ({
    message_toast
}) => {

    return (
        <div className="toast__container toast__alert__error">

            <div className="toast__icon">
                <CircleAlert
                color="#E72B2B"
                />
            </div>

            <div className="toast__text">
                <p className="error-message">
                    {message_toast}
                </p>
            </div>
        </div>
    )
}


export default AlertToast;