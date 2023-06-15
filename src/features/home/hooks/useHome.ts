import { useAuth, usePets, useServices, useVeterinarians, useVolunteeringActivities, usePetOfUser, useDeviceToken } from '../../../data/hooks/auth';

export const useHome = () => {
  // Register call api
  // const auth = useAuth();

  const deviceTokens = useDeviceToken()

  const services = useServices()

  const pets = usePets()

  const veterinarians = useVeterinarians()

  const volunteering = useVolunteeringActivities()

  const petsOfUser = usePetOfUser()

  const getServices = () => {
    services.mutate()
  }

  const getPets = () => {
    pets.mutate()
  }

  const getVeterinarians = () => {
    veterinarians.mutate()
  }

  const getVolunteeringActivities = () => {
    volunteering.mutate()
  }

  const getPetOfUser = (id: number) => {
    petsOfUser.mutate({ id: id })
  }

  const saveDeviceToken = (deviceToken: string, id: number) => {
    deviceTokens.mutate({ deviceToken: deviceToken, id: id })
  }

  return {
    isLoading: services.isLoading || pets.isLoading || veterinarians.isLoading || volunteering.isLoading || deviceTokens.isLoading,
    getServices,
    dataService: services.data,
    getPets,
    dataPet: pets.data,
    getVeterinarians,
    getPetOfUser,
    saveDeviceToken,
    dataPetOfUser: petsOfUser.data,
    dataVeterinarian: veterinarians.data,
    getVolunteeringActivities,
    dataVolunteering: volunteering.data,
    error: services.error || pets.error || veterinarians.error || veterinarians.error || deviceTokens.error,
  };
};
