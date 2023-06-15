import { useAppointmentUser, useServices } from "../../../data/hooks/auth"

export const useDetail = () => {
    const services = useServices()

    const getServices = () => {
        services.mutate()
    }

    const appointment = useAppointmentUser()
    const getAppointment = (id: number) => {
        appointment.mutate({ idUser: id })
    }

    return {
        isLoading: services.isLoading || appointment.isLoading,
        getServices,
        getAppointment,
        data: services.data,
        dataAppointment: appointment.data,
        error: services.error || appointment.error
    }
}