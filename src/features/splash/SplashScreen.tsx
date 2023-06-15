import React, {useEffect} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import {SplashStyles} from './Splash.Style';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import {useNavigation} from '@react-navigation/native';
import {SplashRootProp} from '../../navigation/props/index';

const SplashScreen = () => {
  const navigation = useNavigation<SplashRootProp>();
  const getTokenAndExpiresAt = async () => {
    const token = await LocalStore.getData(LocalStoreKeys.AccessToken);
    const expiresAt = await LocalStore.getData(LocalStoreKeys.ExpiresAt);
    if (
      (token == null && expiresAt == null) ||
      (expiresAt != null && new Date(expiresAt) < new Date())
    ) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('HomeTab', {screen: 'Home'});
    }
  };

  useEffect(() => {
    getTokenAndExpiresAt();
  }, []);

  return <BaseScreen style={SplashStyles.container}></BaseScreen>;
};

export default SplashScreen;
