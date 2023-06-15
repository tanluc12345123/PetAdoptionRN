import {View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BaseScreen} from '../../components/BaseScreen';
import {useChangePassword} from './hooks/useChangePassword';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import {useEffect, useState} from 'react';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import {ChangePasswordStyles} from './ChangePassword.Style';
import InputText from '../../components/InputText/InputText';
import Button from '../../components/Button/Button';
import {ChangePasswordRootProp} from '../../navigation/props/index';
import {ScrollView} from 'native-base';
import {ChangePasswordRequest} from '../../data/model/index';

const ChangePasswordScreen = () => {
  const navigation = useNavigation<ChangePasswordRootProp>();
  const {isLoading, error, data, getUser, dataUpdate, updatePassword} =
    useChangePassword();

  const [oldPassword, setOldPassword] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const [isShowPassword1, setShowPassword1] = useState<boolean>(false);
  const [isShowPassword2, setShowPassword2] = useState<boolean>(false);

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    if (dataUpdate?.status === 'Success') {
      Alert.alert('Change Password!', 'Change Password Successful!', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  }, [dataUpdate]);

  const changePassword = () => {
    const body: ChangePasswordRequest = {
      oldPassword: oldPassword ?? '',
      newPassword: newPassword ?? '',
      confirmPassword: confirmPassword ?? '',
    };
    updatePassword(data?.data.id ?? 0, body);
  };

  return (
    <BaseScreen
      isLoading={isLoading}
      error={error}
      style={ChangePasswordStyles.container}>
      <View style={{marginTop: 10}}>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="Change Password"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <InputText
          style={{marginTop: 30, marginHorizontal: 20}}
          title={'Old Password'}
          value={oldPassword}
          isPassword
          none
          isShowPassword={isShowPassword1}
          onChange={value => setOldPassword(value)}
          onPressShowPassword={value => setShowPassword1(value)}
        />
        <InputText
          style={{marginTop: 20, marginHorizontal: 20}}
          title={'New Password'}
          value={newPassword}
          isPassword
          none
          isShowPassword={isShowPassword}
          onChange={value => setNewPassword(value)}
          onPressShowPassword={value => setShowPassword(value)}
        />
        <InputText
          style={{marginTop: 30, marginHorizontal: 20}}
          title={'Confirm Password'}
          value={confirmPassword}
          isPassword
          none
          isShowPassword={isShowPassword2}
          onChange={value => setConfirmPassword(value)}
          onPressShowPassword={value => setShowPassword2(value)}
        />
      </ScrollView>
      <Button
        title="Update information"
        style={{width: '90%', position: 'absolute', bottom: 0, margin: 20}}
        onPress={() => {
          changePassword();
        }}
      />
    </BaseScreen>
  );
};

export default ChangePasswordScreen;
