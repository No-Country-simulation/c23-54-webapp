import { now } from "underscore"
import { jobApplicationService } from "../../Services/jobApplicationService"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"


const UseJobApplication = () =>{
    const {idUser} = useContext(AuthContext);

        const {postjobApplication} = jobApplicationService()
    const applyjob = async(ID_offer) =>{

        const formdata = 
        {
            ID_user: idUser,
            ID_offer: ID_offer,
            application_date: new Date().toISOString() ,
            ID_application_status: 2

        }
        console.log(formdata)
        try{
            await postjobApplication(formdata);
            console.log("Postulación exitosa");
            window.location.href = '/Postulaciones'


        }catch{
            console.log('erro al postularse')
        }
    }

    return applyjob

}

export default UseJobApplication