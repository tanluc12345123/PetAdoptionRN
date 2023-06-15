import { usePets } from "../../../data/hooks/auth";
import { useTypes } from '../../../data/hooks/auth';

export const usePet = () => {
    const pets = usePets()
    const types = useTypes()

    const getPets = () => {
        pets.mutate()
    }

    const getTypes = () => {
        types.mutate()
    }

    return {
        isLoading: pets.isLoading || types.isLoading,
        getPets,
        getTypes,
        data: pets.data,
        dataType: types.data,
        error: pets.error || types.error,
    }
};
