import { useServices } from "../../../data/hooks/auth"

export const useDetail = () => {
    const services = useServices()

    const getServices = () => {
        services.mutate()
    }

    return {
        isLoading: services.isLoading,
        getServices,
        data: services.data,
        error: services.error
    }
}