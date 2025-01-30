import { useState } from "react";
import { MyapplicationsService } from "../../Services/MyapplicationsService"


const UseMyapplications = () =>{

    const [data, setData] = useState();

    const FetchMyaaplications = async (filter) =>{

        try{
            const response = await MyapplicationsService();
            const data = await response.json();

            if (filter === true) {
                setData(data.filter(offer => ['pending', 'read', 'in_revision', 'approved'].includes(offer.ApplicationStatus.status)));
                return data.filter(offer => ['pending', 'read', 'in_revision', 'approved'].includes(offer.ApplicationStatus.status));
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