import { UserService } from "../../Services/UserService"

const UseProfileUser = () =>{

    const FecthProfile = async() =>{

        try{
            const response = await UserService();
            
            const data = await response
            return data;
            
        }catch{

        }
    }

    return {FecthProfile}


}

export default UseProfileUser