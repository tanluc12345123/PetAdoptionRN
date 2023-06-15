import { useBookingAppointment, useBookingService, useUser } from "../../../data/hooks/auth"
import { BookingAppointmentRequest, BookingServiceRequest } from '../../../data/model/index';

export const usePaymentService = () => {
    const book = useBookingService()

    const booking = (request: BookingServiceRequest) => {
        book.mutate(request)
    }

    return {
        isLoading: book.isLoading,
        booking,
        data: book.data,
        error: book.error
    }
}
