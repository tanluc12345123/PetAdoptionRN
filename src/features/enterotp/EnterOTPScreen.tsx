import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import BgLogin from '../../assets/images/bg_login.svg';
import {BaseScreen} from '../../components/BaseScreen';
import {EnterOTPStyles} from './EnterOTP.Style';
import {Fonts} from '../../assets/fonts/index';
import InputText from '../../components/InputText/InputText';
import IconFacebook from '../../assets/images/ic_facebook.svg';
import IconTwitter from '../../assets/images/ic_twitter.svg';
import IconGoogle from '../../assets/images/ic_google.svg';
import Button from '../../components/Button/Button';
import {Colors} from '../../theme';
import {useOTP} from './hooks/useOTP';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  VerifyOTPRootProps,
} from '../../navigation/props/index';
import {useEffect} from 'react';
import {VerifyOTPRouteProp} from '../../navigation/route/index';

const EnterOTPScreen = () => {
  const navigation = useNavigation<VerifyOTPRootProps>();
  const route = useRoute<VerifyOTPRouteProp>();
  const {isLoading, verify, data, error} = useOTP();
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    if (data?.status === 'Success') {
      navigation.replace('EnterPassword', {phone: route.params.phone});
    }
  }, [data]);

  return (
    <BaseScreen
      style={EnterOTPStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={EnterOTPStyles.bgLogin}>
          <View style={EnterOTPStyles.titleLogin}>
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
            title="Enter your OTP"
            value={code}
            none
            onChange={text => setCode(text)}
            onPressShowPassword={() => {}}
          />
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <IconTwitter width={30} height={30} style={{marginRight: 10}} />
            <IconFacebook width={30} height={30} style={{marginRight: 10}} />
            <IconGoogle width={30} height={30} />
            <Button
              title="Submit"
              type="submit"
              disabled={code === ''}
              style={{position: 'absolute', right: 0}}
              onPress={() => verify('%2B84' + route.params.phone, code)}
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
            title="Back!"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

export default EnterOTPScreen;
