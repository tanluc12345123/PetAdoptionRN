import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser, useUpdateUser, useUpdateAvatar, useChangePasswordUser } from '../../../data/hooks/auth';
import { UpdateUserRequest, ChangePasswordRequest } from '../../../data/model/index';

export const useChangePassword = () => {
  const user = useUser()

  const update = useChangePasswordUser()

  const updatePassword = (id: number, body: ChangePasswordRequest) => {
    update.mutate({ body: body, id: id })
  }

  const getUser = (id: number) => {
    user.mutate({ id: id })
  }

  return {
    isLoading: user.isLoading || update.isLoading,
    getUser,
    updatePassword,
    dataUpdate: update.data,
    data: user.data,
    error: user.error || update.error,
  }
};
