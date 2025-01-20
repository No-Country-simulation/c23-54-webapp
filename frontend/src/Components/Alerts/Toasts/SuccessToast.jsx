import { CircleCheckBig  } from 'lucide-react';

const SuccessToast = ({
    message_toast
}) => {

    return (
        <div className="toast__container toast__alert__success">

            <div className="toast__icon">
                <CircleCheckBig 
                color="#2be744"
                />
            </div>

            <div className="toast__text">
                <p className="success-message">
                    {message_toast}
                </p>
            </div>
        </div>
    )
}


export default SuccessToast;