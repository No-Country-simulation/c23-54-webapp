


export const MyapplicationsService = async () =>{
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