import { jobApplicationService } from "../../Services/jobApplicationService"

export const UseDelteApplication = () =>{

    const {DeleteApplicationsService} = jobApplicationService();
    const DelteApplication = async (ID_application) =>{

        try{
            await  DeleteApplicationsService(ID_application);
            
            return true
        }catch{

        }
    }

    return {DelteApplication}
}