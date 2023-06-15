import { usePets, useAppointmentUser } from '../../../../data/hooks/auth';
import { useTypes } from '../../../../data/hooks/auth';

export const usePet = () => {
    const appointment = useAppointmentUser()
    const getAppointment = (id: number) => {
        appointment.mutate({ idUser: id })
    }
    return {
        isLoading: appointment.isLoading,
        getAppointment,
        data: appointment.data,
        error: appointment.error,
    }
};
