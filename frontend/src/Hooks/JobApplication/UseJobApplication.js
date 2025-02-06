import { now } from "underscore"
import { jobApplicationService } from "../../Services/jobApplicationService"
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"


const UseJobApplication = () =>{
    const {idUser} = useContext(AuthContext);
    const [error, seterror] = useState(false)
    const navigate = useNavigate(); // Usamos el hook 'useNavigate'

        const {postjobApplication} = jobApplicationService()
    const applyjob = async(ID_offer) =>{
        seterror(false)
        const formdata = 
        {
            ID_user: idUser,
            ID_offer: ID_offer,
            application_date: new Date().toISOString() ,
            ID_application_status: 2

        }
        try{
            await postjobApplication(formdata);
            navigate('/Postulaciones', { state: { logged: true, message: 'Postulacion Exitosa' } }); 


        }catch{
            
            // seterror(true)
          
            // setTimeout(() => {
            //     seterror(false)
            // }, 2000)
        }
    }

    return {applyjob, error}

}

export default UseJobApplication