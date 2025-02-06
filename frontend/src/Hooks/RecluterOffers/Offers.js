import { FetchOffersService } from "../../Services/FetchOffersService"

const UseOffers = () =>{

    const FetchallOffers = async(userId) =>{
        try{
            if (!userId) throw new Error("No hay usuario autenticado");
            const g = await   FetchOffersService(userId);
            console.log(g)
            return await FetchOffersService(userId); 
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    return { FetchallOffers };
};

export default UseOffers;