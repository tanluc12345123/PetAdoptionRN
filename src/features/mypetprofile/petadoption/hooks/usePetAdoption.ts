import { usePets } from "../../../../data/hooks/auth";
import { useTypes, usePetAdoption } from '../../../../data/hooks/auth';

export const usePetsAdoption = () => {
    const petsAdoption = usePetAdoption()
    const getPetAdoption = (id: number) => {
        petsAdoption.mutate({ idPet: id })
    }

    return {
        isLoading: petsAdoption.isLoading,
        getPetAdoption,
        dataAdoption: petsAdoption.data,
        error: petsAdoption.error,
    }
};
