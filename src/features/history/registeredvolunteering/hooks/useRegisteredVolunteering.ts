import { usePets, useRegisteredVolunteeringUser } from '../../../../data/hooks/auth';
import { useTypes, usePetAdoption } from '../../../../data/hooks/auth';

export const useRegisteredVolunteering = () => {
    const book = useRegisteredVolunteeringUser()
    const getRegistered = (id: number) => {
        book.mutate({ idUser: id })
    }

    return {
        isLoading: book.isLoading,
        getRegistered,
        data: book.data,
        error: book.error,
    }
};
