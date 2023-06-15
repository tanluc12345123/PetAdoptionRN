import { useCancelBookingService } from '../../../data/hooks/auth';

export const useConfirm = () => {
    const cancel = useCancelBookingService()
    const cancelBookingService = (id: number) => {
        cancel.mutate({ id: id })
    }

    return {
        isLoading: cancel.isLoading,
        data: cancel.data,
        cancelBookingService,
        error: cancel.error
    }
}
