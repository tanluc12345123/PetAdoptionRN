import { useBookVeterinarian } from "../../../data/hooks/auth"
import { BookingVeterinarianRequest } from '../../../data/model/index';

export const usePaymentVeterinarian = () => {
    const bookingVeterinarian = useBookVeterinarian()

    const booking = (request: BookingVeterinarianRequest) => {
        bookingVeterinarian.mutate(request)
    }

    return {
        isLoading: bookingVeterinarian.isLoading,
        booking,
        data: bookingVeterinarian.data,
        error: bookingVeterinarian.error
    }
}
