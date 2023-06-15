import { useVolunteeringActivities } from "../../../data/hooks/auth";

export const useVolunteering = () => {
    const volunteering = useVolunteeringActivities()

    const getVolunteeringActivities = () => {
        volunteering.mutate()
    }

    return {
        isLoading: volunteering.isLoading,
        getVolunteeringActivities,
        data: volunteering.data,
        error: volunteering.error
    }
};
