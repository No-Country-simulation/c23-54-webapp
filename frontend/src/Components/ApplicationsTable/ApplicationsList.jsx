
import { useEffect, useState } from 'react';
import { JobOffersService } from '../../Services/JobOffersService';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UseUpdateApplications } from '../../Hooks/JobApplication/UseUpdateApplications';
import { UseApplicationStatuses } from '../../Hooks/JobApplication/UseApplicationStatuses';

const ApplicationsList = ({
    ID_offer,
}) => {


    const { getApplicantsForOfferById } = JobOffersService();
    const [errorMessage, setErrorMessage] = useState(null);
    const {GetApplicationStatuses} =  UseApplicationStatuses();
    const {UpdateApplications} = UseUpdateApplications();
    const navigate = useNavigate();
    const [applicantsList, setApplicantsList] = useState([]);
    const [Statuses, SetStatuses] = useState([])
    useEffect(() => {

        const fetchApplicantsData = async () => {
            const response = await getApplicantsForOfferById(ID_offer);
            const responsestatuses = await GetApplicationStatuses();
            if (!response) {
                setErrorMessage(errorMessage)
            };
            SetStatuses(responsestatuses)
            setApplicantsList(response.data);
        }

        fetchApplicantsData()

    }, [ID_offer])


    const redirectToProfile = (ID_user) => {

        navigate(`/MiPerfil/${ID_user}`)
    }
    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await UpdateApplications(applicationId, newStatus);
            
            setApplicantsList((prevList) =>
                prevList.map((applicant) =>
                    applicant.ID_application === applicationId
                        ? { ...applicant, ApplicationStatus: { status: newStatus } }
                        : applicant
                )
            );
        } catch (error) {
            setErrorMessage('Error actualizando el estado');
        }
    };
    

    return (
        <>
            {applicantsList.length > 0 ? (

                <div className='applicant__list__container page__container__template'>

                    <h2 className='applicant__title '>Postulantes</h2>

                    {applicantsList.map((applicant) => (
                        <>

                            <div
                                className='applicant__container'
                                key={applicant.ID_application_status}>

                                <div className='applicant__primary'>
                                    <div className='applicant__img'>
                                        <img src={applicant.User.img || "https://www.clarin.com/img/2024/10/12/vrmXfT9Go_600x600__1.jpg"} alt="" />
                                    </div>

                                    <button
                                    className='non-styled' 
                                    onClick={() => redirectToProfile(applicant.User.ID_user)}
                                    >
                                        <Eye
                                            className='card__offer__icon applicant__hover'
                                        />

                                    </button>
                                </div>

                                <div className='applicant__secondary'>
                                <h4>{applicant.User.name}</h4>
                                <p>{`Celular: ${applicant.User.phone}`}</p>
                                <p>{`Email: ${applicant.User.email}`}</p>

                                <select
                                    value={applicant.ApplicationStatus.status}
                                    onChange={(e) => handleStatusChange(applicant.ID_application, e.target.value)}
                                >
                                    {Statuses.map((status) => (
                                        <option key={status.ID_application_status}
                                        value={status. ID_application_status}>

                                            {status.status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                                <div>

                                </div>

                            </div>

                            <div className='divider-x'></div>
                        </>

                    ))}

                </div>
            ) :
                (<div className='applicant__empty'> No hay postulantes aún </div>)
            }

        </>
    )
}


export default ApplicationsList;