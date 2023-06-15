import { useCancelBookingVeterinarian } from "../../../data/hooks/auth"

export const useConfirm = () => {
    const cancel = useCancelBookingVeterinarian()
    const cancelBookingVeterinarian = (id: number) => {
        cancel.mutate({ id: id })
    }

    return {
        isLoading: cancel.isLoading,
        data: cancel.data,
        cancelBookingVeterinarian,
        error: cancel.error
    }
}
