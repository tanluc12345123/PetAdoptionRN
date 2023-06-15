import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser, useUpdateUser, useUpdateAvatar } from '../../../data/hooks/auth';
import { UpdateUserRequest } from '../../../data/model/index';

export const useProfile = () => {
  const user = useUser()

  const update = useUpdateUser()

  const updateInformation = (id: number, body: UpdateUserRequest) => {
    update.mutate({ body: body, id: id })
  }

  const getUser = (id: number) => {
    user.mutate({ id: id })
  }

  const updateAvatar = useUpdateAvatar()

  const updateAvatarUser = (id: number, body: FormData) => {
    updateAvatar.mutate({ body: body, id: id })
  }

  return {
    isLoading: user.isLoading || update.isLoading || updateAvatar.isLoading,
    getUser,
    updateInformation,
    dataUpdate: update.data,
    updateAvatarUser,
    dataAvatar: updateAvatar.data,
    data: user.data,
    error: user.error || update.error || updateAvatar.error
  }
};
