import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import BgLogin from '../../assets/images/bg_login.svg';
import {BaseScreen} from '../../components/BaseScreen';
import {LoginStyles} from './Login.Style';
import {Fonts} from '../../assets/fonts/index';
import InputText from '../../components/InputText/InputText';
import {Checkbox} from 'native-base';
import IconFacebook from '../../assets/images/ic_facebook.svg';
import IconTwitter from '../../assets/images/ic_twitter.svg';
import IconGoogle from '../../assets/images/ic_google.svg';
import Button from '../../components/Button/Button';
import {Colors} from '../../theme';
import {useLogin} from './hooks/useLogin';
import {useNavigation} from '@react-navigation/native';
import {LoginRootProps} from '../../navigation/props/index';
import {useEffect} from 'react';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import Moment from 'moment';

const LoginScreen = () => {
  const navigation = useNavigation<LoginRootProps>();
  const {isLoading, login, data, error} = useLogin();
  const [phone, setPhone] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  const navigateHome = () => {
    if (data?.status === 'Success') {
      navigation.navigate('HomeTab', {screen: 'Home'});
    }
  };

  const setData = () => {
    if (data?.data != undefined) {
      LocalStore.setData(LocalStoreKeys.AccessToken, data.data.token);
      LocalStore.setData(LocalStoreKeys.Type, data.data.type);
      LocalStore.setData(LocalStoreKeys.UseId, data.data.id.toString());
      LocalStore.setData(LocalStoreKeys.Name, data.data.fullName);
      LocalStore.setData(
        LocalStoreKeys.ExpiresAt,
        Moment(data.data.expiresAt).toString(),
      );
    }
  };

  useEffect(() => {
    setData();
    navigateHome();
  }, [data]);

  return (
    <BaseScreen
      style={LoginStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={LoginStyles.bgLogin}>
          <View style={LoginStyles.titleLogin}>
            <Text style={LoginStyles.titleHello}>Hello Welcome Back!</Text>
            <Text style={{fontFamily: Fonts.ROBOTO_REGULAR}}>
              Sign to continue
            </Text>
          </View>
          <BgLogin width={200} height={200} style={{marginTop: 20}} />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            marginHorizontal: 20,
          }}>
          <InputText
            title="Phone"
            value={phone}
            none
            onChange={text => setPhone(text)}
            onPressShowPassword={() => {}}
          />
          <InputText
            title="Password"
            value={password}
            isPassword
            none
            isShowPassword={isShowPassword}
            style={{marginTop: 30}}
            onChange={text => setPassword(text)}
            onPressShowPassword={value => setShowPassword(value)}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Checkbox
              value="remember"
              isChecked={remember}
              onChange={isSelected => setRemember(isSelected)}>
              <Text style={{fontFamily: Fonts.ROBOTO_REGULAR, marginLeft: 5}}>
                Remember me
              </Text>
            </Checkbox>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
              }}>
              <Text style={{fontFamily: Fonts.ROBOTO_REGULAR}}>
                Forgot password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <IconTwitter width={30} height={30} style={{marginRight: 10}} />
            <IconFacebook width={30} height={30} style={{marginRight: 10}} />
            <IconGoogle width={30} height={30} />
            <Button
              title="Let's go"
              type="submit"
              disabled={phone === '' || password === ''}
              style={{position: 'absolute', right: 0}}
              onPress={() => login({phone: phone, password: password})}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.silverSand,
                height: 1,
                marginRight: 4,
              }}
            />
            <Text style={{fontFamily: Fonts.ROBOTO_REGULAR}}>
              Create Account
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.silverSand,
                height: 1,
                marginLeft: 4,
              }}
            />
          </View>
          <Button
            style={{marginTop: 50, alignSelf: 'center', width: '70%'}}
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

export default LoginScreen;
