import { useCancelBookingVolunteering } from '../../../data/hooks/auth';

export const useConfirm = () => {
    const cancel = useCancelBookingVolunteering()
    const cancelBookingVolunteering = (id: number, reason: string) => {
        cancel.mutate({ id: id, reason: reason })
    }

    return {
        isLoading: cancel.isLoading,
        data: cancel.data,
        cancelBookingVolunteering,
        error: cancel.error
    }
}
