import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../data/hooks/auth';

export const useProfile = () => {
  const user = useUser()

  const getUser = (id: number) => {
    user.mutate({ id: id })
  }

  return {
    isLoading: user.isLoading,
    getUser,
    data: user.data,
    error: user.error
  }
};
