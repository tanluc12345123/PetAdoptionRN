import { useUser, useBookVeterinarian } from "../../../data/hooks/auth"
import { BookingVeterinarianRequest } from '../../../data/model/index';

export const useBookingVeterinarian = () => {
    const user = useUser()

    const getUser = (id: number) => {
        user.mutate({ id: id })
    }

    return {
        isLoading: user.isLoading,
        getUser,
        data: user.data,
        error: user.error
    }
}
