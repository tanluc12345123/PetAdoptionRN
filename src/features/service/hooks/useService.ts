import { useServices, useVeterinarians } from '../../../data/hooks/auth';

export const useService = () => {
    const services = useServices()
    const veterinarians = useVeterinarians()

    const getServices = () => {
        services.mutate()
    }

    const getVeterinarians = () => {
        veterinarians.mutate()
    }

    return {
        isLoading: services.isLoading || veterinarians.isLoading,
        getServices,
        getVeterinarians,
        data: services.data,
        dataVeterinarian: veterinarians.data,
        error: services.error || veterinarians.error
    }
};
