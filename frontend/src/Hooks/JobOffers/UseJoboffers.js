import { FetchJobOffersService } from "../../Services/FetchJobsOffersService"

const UseJobOffers = () =>{

    const FecthallJobOffers = async() =>{
        try{
            const response = await  FetchJobOffersService()
            const data = await response.json();
          
            return data;

        }catch(error){
            console.log(error)
        }
    }

    return {FecthallJobOffers}

}

export default UseJobOffers