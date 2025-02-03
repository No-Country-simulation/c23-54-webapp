import { FetchOffersService } from "../../Services/FetchOffersService"

const UseOffers = () =>{

    const FetchallOffers = async() =>{
        try{
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("No hay usuario autenticado");

            const response = await FetchOffersService(userId);
            const data = await response.json();
            return data;
        }catch(error){
            console.log(error)
            return [];
        }
    }

    return {FetchallOffers}

}

export default UseOffers