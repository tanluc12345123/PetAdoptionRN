import {useBookingServiceUser} from '../../../../data/hooks/auth';

export const useBookingServiceHistory = () => {
  const book = useBookingServiceUser();
  const getBookServiceUser = (id: number) => {
    book.mutate({idUser: id});
  };
  return {
    isLoading: book.isLoading,
    getBookServiceUser,
    data: book.data,
    error: book.error,
  };
};
