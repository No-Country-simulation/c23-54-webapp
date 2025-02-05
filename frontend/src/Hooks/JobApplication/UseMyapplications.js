// import { useState } from "react";
// import { jobApplicationService } from "../../Services/jobApplicationService";


// const UseMyapplications = () =>{

//     const [data, setData] = useState();
//     const {MyapplicationsService} = jobApplicationService();

//     const FetchMyaaplications = async ( filter, idUser) =>{

//         try{
//             const data = await MyapplicationsService(idUser);
//             if (filter === true) {
//                 const filteredData = data.filter(offer =>
//                     ['Pendiente', 'Vista', 'En revisión', 'Aprobada'].includes(offer.ApplicationStatus.status)
//                 );
//                 setData(filteredData);
//                 return filteredData;
//             }
            
//             if (filter === false) {
//                 const filteredData = data.filter(offer => offer.ApplicationStatus.status === 'Rechazada');
//                 setData(filteredData);
//                 return filteredData;
//             }

//             setData(data);
//             return data;
//         }catch(error){
//             console.error("Error en FetchMyaaplications:", error);
//             return [];
//         }
//     }

//     return {FetchMyaaplications, data}
// }

// export default UseMyapplications;

import { useState } from "react";
import { jobApplicationService } from "../../Services/jobApplicationService";


const UseMyapplications = () =>{

    const [data, setData] = useState();
    const {MyapplicationsService} = jobApplicationService();

    const FetchMyaaplications = async (filter, idUser) =>{

        try{
            const response = await MyapplicationsService(idUser);
            const data = await response.json();

            if (filter === true) {
                setData(data.filter(offer => ['Pendiente', 'Vista', 'En revisión', 'Aprobada'].includes(offer.ApplicationStatus.status)));
                return data.filter(offer => ['Pendiente', 'Vista', 'En revisión', 'Aprobada'].includes(offer.ApplicationStatus.status));
            } 
            if (filter === false) {
                setData(data.filter(offer => offer.ApplicationStatus.statuss === 'refused'))
                return data.filter(offer => offer.ApplicationStatus.status === 'refused');
            }
            setData(data)
            return data
        }catch(error){

        }
    }

    return {FetchMyaaplications, data}
}

export default UseMyapplications;