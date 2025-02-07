import { ApplicationStatusesService } from "../../Services/ApplicationStatusesService";

export const UseApplicationStatuses = () => {

    const { GetApplicationStatusesService } = ApplicationStatusesService();
    const GetApplicationStatuses = async () => {

        try {
            const response = await GetApplicationStatusesService();
            return response.data
        } catch {
            alert('error')
            return;
        }
    }

    return { GetApplicationStatuses }
}