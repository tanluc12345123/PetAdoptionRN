import { useAuth, useVerify } from '../../../data/hooks/auth';
import { LocalStore, LocalStoreKeys } from '../../../data/local';
import { AuthRequest } from '../../../data/model';

export const useOTP = () => {
    const auth = useVerify();

    const verify = (phone: string, code: string) => {
        auth.mutate({ phone: phone, code: code })
    }

    return {
        isLoading: auth.isLoading,
        verify,
        data: auth.data,
        error: auth.error
    }
};
