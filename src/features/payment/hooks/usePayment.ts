import { useBookingAppointment, useUser } from "../../../data/hooks/auth"
import { BookingAppointmentRequest } from '../../../data/model/index';

export const usePayment = () => {
    const appointment = useBookingAppointment()

    const booking = (request: BookingAppointmentRequest) => {
        appointment.mutate(request)
    }

    return {
        isLoading: appointment.isLoading,
        booking,
        data: appointment.data,
        error: appointment.error
    }
}
