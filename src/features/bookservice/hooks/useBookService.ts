import { usePetOfUser, useUser } from "../../../data/hooks/auth"
import { LocalStore, LocalStoreKeys } from "../../../data/local"

export const useBookService = () => {
    const user = useUser()

    const petsOfUser = usePetOfUser()

    const getUser = (id: number) => {
        user.mutate({ id: id })
    }

    const getPetOfUser = (id: number) => {
        petsOfUser.mutate({ id: id })
    }

    return {
        isLoading: user.isLoading || petsOfUser.isLoading,
        getUser,
        getPetOfUser,
        dataPet: petsOfUser.data,
        data: user.data,
        error: user.error || petsOfUser.error
    }
}
