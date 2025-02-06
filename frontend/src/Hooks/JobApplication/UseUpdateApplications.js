import { jobApplicationService } from "../../Services/jobApplicationService"


export const UseUpdateApplications = () =>{

    const {UpdateApplicationsService} = jobApplicationService();
    const UpdateApplications = async (applicationId, updatedData) =>{

        try{
             await  UpdateApplicationsService(applicationId, updatedData);
            
            return;
        }catch{

        }
    }
    return {UpdateApplications}
}