import { useCancel } from '../../../data/hooks/auth';

export const useConfirm = () => {
    const cancel = useCancel()
    const cancelAppointment = (id: number) => {
        cancel.mutate({ id: id })
    }

    return {
        isLoading: cancel.isLoading,
        data: cancel.data,
        cancelAppointment,
        error: cancel.error
    }
}
