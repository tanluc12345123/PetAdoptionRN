import { useRegisterUser } from '../../../data/hooks/auth';

export const usePassword = () => {
    const auth = useRegisterUser();

    const register = (phone: string, password: string) => {
        auth.mutate({phone: phone, password: password})
    }

    return {
        isLoading: auth.isLoading,
        register,
        data: auth.data,
        error: auth.error
    }
};
