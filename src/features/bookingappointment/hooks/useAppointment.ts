import { useUser } from "../../../data/hooks/auth"
import { LocalStore, LocalStoreKeys } from "../../../data/local"

export const useAppointment = () => {
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
