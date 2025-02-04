

export const jobApplicationService = () =>{


    const postjobApplication = async (formData) =>{

        
        const response = await fetch("http://localhost:3001/api/jobApplications", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });  
        if(!response){
            throw new Error("Error al postularse")
        }
        
        return response.json();
    }

    const MyapplicationsService = async () =>{
        try{
    
    
            const response = await fetch("http://localhost:3001/api/jobApplications", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });        
            return response;
            
    
    
        }catch(error){
    
        }
    }
    return {postjobApplication, MyapplicationsService}
}