import { useState } from "react";
import { MyapplicationsService } from "../../Services/MyapplicationsService"


const UseMyapplications = () =>{

    const [data, setData] = useState();
    const FetchMyaaplications = async () =>{

        try{
            const response = await MyapplicationsService();
            setData(response)
            return data
        }catch(error){

        }
    }

    return {FetchMyaaplications, data}
}

export default UseMyapplications;