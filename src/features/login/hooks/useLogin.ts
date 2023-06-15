import { useAuth } from '../../../data/hooks/auth';
import { LocalStore, LocalStoreKeys } from '../../../data/local';
import { AuthRequest } from '../../../data/model';

export const useLogin = () => {
    const auth = useAuth();

    const login = (request: AuthRequest) => {
        auth.mutate(request)
    }

    return {
        isLoading: auth.isLoading,
        login,
        data: auth.data,
        error: auth.error
    }
};
