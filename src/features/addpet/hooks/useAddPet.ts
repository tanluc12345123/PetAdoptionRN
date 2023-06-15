import { useTypes, useAddPet, useUpdatePet } from '../../../data/hooks/auth';

export const useAddPetUser = () => {
    const types = useTypes()

    const addPet = useAddPet()

    const updatePet = useUpdatePet()

    const updatePetUser = (idPet: number, idType: number, body: FormData) => {
        updatePet.mutate({ idPet: idPet, idType: idType, body: body })
    }

    const getTypes = () => {
        types.mutate()
    }

    const addPetFunc = (request: { body: FormData, idType: number, idUser: number }) => {
        addPet.mutate(request)
    }

    return {
        isLoading: types.isLoading || addPet.isLoading || updatePet.isLoading,
        getTypes,
        addPetFunc,
        updatePetUser,
        dataUpdate: updatePet.data,
        dataType: types.data,
        data: addPet.data,
        error: types.error || addPet.error || updatePet.error,
    }
}
