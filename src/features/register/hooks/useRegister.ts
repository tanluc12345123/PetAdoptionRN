import { useGenerate } from '../../../data/hooks/auth';
import { LocalStore, LocalStoreKeys } from '../../../data/local';
import { AuthRequest } from '../../../data/model';

export const useRegister = () => {
    const auth = useGenerate();

    const generateOtp = (phone: string) => {
        auth.mutate({ phone: phone })
    }

    return {
        isLoading: auth.isLoading,
        generateOtp,
        data: auth.data,
        error: auth.error
    }
};
