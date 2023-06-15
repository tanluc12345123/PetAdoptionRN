import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import BgLogin from '../../assets/images/bg_login.svg';
import {BaseScreen} from '../../components/BaseScreen';
import {EnterPasswordStyles} from './EnterPassword.Style';
import {Fonts} from '../../assets/fonts/index';
import InputText from '../../components/InputText/InputText';
import {Checkbox} from 'native-base';
import IconFacebook from '../../assets/images/ic_facebook.svg';
import IconTwitter from '../../assets/images/ic_twitter.svg';
import IconGoogle from '../../assets/images/ic_google.svg';
import Button from '../../components/Button/Button';
import {Colors} from '../../theme';
import {usePassword} from './hooks/usePassword';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RegisterUserRootProps} from '../../navigation/props/index';
import {useEffect} from 'react';
import {RegisterRouteProp} from '../../navigation/route/index';

const EnterPasswordScreen = () => {
  const navigation = useNavigation<RegisterUserRootProps>();
  const route = useRoute<RegisterRouteProp>();
  const {isLoading, register, data, error} = usePassword();
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (data?.status === 'Success') {
      Alert.alert('Register!', 'Register Successful!', [{text: 'Ok'}]);
      navigation.pop();
      navigation.pop();
    }
  }, [data]);

  return (
    <BaseScreen
      style={EnterPasswordStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={EnterPasswordStyles.bgLogin}>
          <View style={EnterPasswordStyles.titleLogin}>
            <Text style={{fontFamily: Fonts.ROBOTO_BOLD, fontSize: 30}}>
              Create your account
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
            title="Password"
            value={password}
            isPassword
            none
            isShowPassword={isShowPassword}
            style={{marginTop: 30}}
            onChange={text => setPassword(text)}
            onPressShowPassword={value => setShowPassword(value)}
          />
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <IconTwitter width={30} height={30} style={{marginRight: 10}} />
            <IconFacebook width={30} height={30} style={{marginRight: 10}} />
            <IconGoogle width={30} height={30} />
            <Button
              title="Submit"
              type="submit"
              disabled={password === ''}
              style={{position: 'absolute', right: 0}}
              onPress={() => register(route.params.phone, password)}
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
              Already a member?
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
            type="submit"
            style={{marginTop: 50, alignSelf: 'center', width: '70%'}}
            title="Enter difference phone"
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

export default EnterPasswordScreen;
