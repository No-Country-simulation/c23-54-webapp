import { UserService } from "../../Services/UserService"

const UseProfileUser = () =>{

    const FecthProfile = async(ID_user) =>{

        try{
            const response = await UserService(ID_user);
            
            const data = await response
            return data;
            
        }catch{

        }
    }

    return {FecthProfile}


}

export default UseProfileUser