import { useBookingVeterinarianUser } from '../../../../data/hooks/auth';

export const useBookingVeterinarian = () => {
    const book = useBookingVeterinarianUser()

    const getBookVeterinarian = (id: number) => {
        book.mutate({ idUser: id })
    }

    return {
        isLoading: book.isLoading,
        getBookVeterinarian,
        data: book.data,
        error: book.error
    }
};
