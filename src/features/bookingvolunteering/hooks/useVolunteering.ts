import { useRegisterVolunteering, useUser } from "../../../data/hooks/auth"

export const useVolunteering = () => {
    const user = useUser()

    const register = useRegisterVolunteering()

    const getUser = (id: number) => {
        user.mutate({ id: id })
    }

    const registerVolunteering = (idUser: number, idVolunteer: number) => {
        register.mutate({ idUser: idUser, idVolunteering: idVolunteer })
    }

    return {
        isLoading: user.isLoading || register.isLoading,
        getUser,
        registerVolunteering,
        data: user.data,
        dataBook: register.data,
        error: user.error || register.error
    }
}
