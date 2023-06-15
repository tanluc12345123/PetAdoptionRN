import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import BgLogin from '../../assets/images/bg_login.svg';
import {BaseScreen} from '../../components/BaseScreen';
import {RegisterStyles} from './Register.Style';
import {Fonts} from '../../assets/fonts/index';
import InputText from '../../components/InputText/InputText';
import {Checkbox} from 'native-base';
import IconFacebook from '../../assets/images/ic_facebook.svg';
import IconTwitter from '../../assets/images/ic_twitter.svg';
import IconGoogle from '../../assets/images/ic_google.svg';
import Button from '../../components/Button/Button';
import {Colors} from '../../theme';
import {useRegister} from './hooks/useRegister';
import {useNavigation} from '@react-navigation/native';
import {RegisterRootProps} from '../../navigation/props/index';
import {useEffect} from 'react';

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterRootProps>();
  const {isLoading, generateOtp, data, error} = useRegister();
  const [phone, setPhone] = useState<string>('');

  useEffect(() => {
    if (data?.status === 'Success') {
      navigation.navigate('EnterOTP', {phone: phone});
    }
  }, [data]);

  return (
    <BaseScreen
      style={RegisterStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={RegisterStyles.bgLogin}>
          <View style={RegisterStyles.titleLogin}>
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
            title="Enter your phone"
            value={phone}
            none
            onChange={text => setPhone(text)}
            onPressShowPassword={() => {}}
          />
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <IconTwitter width={30} height={30} style={{marginRight: 10}} />
            <IconFacebook width={30} height={30} style={{marginRight: 10}} />
            <IconGoogle width={30} height={30} />
            <Button
              title="Submit"
              type="submit"
              disabled={phone === ''}
              style={{position: 'absolute', right: 0}}
              onPress={() => generateOtp('%2B84' + phone)}
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
            title="Login with your account"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

export default RegisterScreen;
