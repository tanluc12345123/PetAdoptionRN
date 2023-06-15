import { usePets, useTypes, useFilter } from '../../../data/hooks/auth';

export const useSearch = () => {
    const pets = usePets()
    const types = useTypes()
    const filter = useFilter()

    const filterPet = (keyword: string, type: string, minAge: number, maxAge: number, gender: string) => {
        filter.mutate({ keyword: keyword, type: type, minAge: minAge, maxAge: maxAge, gender: gender })
    }

    const getPets = () => {
        pets.mutate()
    }

    const getTypes = () => {
        types.mutate()
    }

    return {
        isLoading: pets.isLoading || types.isLoading || filter.isLoading,
        getPets,
        getTypes,
        filterPet,
        dataFilter: filter.data,
        data: pets.data,
        dataType: types.data,
        error: pets.error || types.error || filter.error,
    }
}
