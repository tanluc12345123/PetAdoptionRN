import {Button, Text, View} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {BaseScreen} from '../../components/BaseScreen';
import {useProfile} from './hooks/useProfile';
import {HomeTabScreenProps} from '../../navigation/route/index';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import {Image} from 'react-native';
import {useEffect, useState} from 'react';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import {Colors} from '../../theme';
import ItemProfile from './components/ItemProfile';
import {ProfileStyles} from './Profile.Style';
import {ScrollView} from 'native-base';

const ProfileScreen = () => {
  const route = useRoute<HomeTabScreenProps<'Profile'>['route']>();
  const navigation =
    useNavigation<HomeTabScreenProps<'Profile'>['navigation']>();
  const {isLoading, error, data, getUser} = useProfile();
  const [avatar, setAvatar] = useState<string>();

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    setAvatar(data?.data.avatar);
  }, [data]);

  const Logout = () => {
    LocalStore.setData(LocalStoreKeys.AccessToken, '');
    LocalStore.setData(LocalStoreKeys.Type, '');
    LocalStore.setData(LocalStoreKeys.UseId, '');
    LocalStore.setData(LocalStoreKeys.Name, '');
    LocalStore.setData(LocalStoreKeys.ExpiresAt, '');
    navigation.replace('Login');
  };

  return (
    <BaseScreen
      isLoading={isLoading}
      error={error}
      style={ProfileStyles.container}>
      <View style={{marginTop: 10}}>
        <ToolbarHeader
          onPressLeft={() => {}}
          onPressRight={() => {}}
          title="My profile"
        />
      </View>
      <View style={{flexDirection: 'column', paddingHorizontal: 10}}>
        {avatar ? (
          <Image
            source={{uri: avatar}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
        ) : (
          <Image
            source={Drawables.ic_image}
            style={{
              width: 100,
              height: 100,
              borderRadius: 150,
              alignSelf: 'center',
            }}
          />
        )}
        <ScrollView style={{flexDirection: 'column'}}>
          <ItemProfile
            title="Personal Information."
            body="Change your personal information here."
            onPress={() => navigation.navigate('MyProfile')}
          />
          <ItemProfile
            title="Change Password."
            body="Change your password here."
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <ItemProfile
            title="Your Pets."
            body="See your pets and pets for adoption here."
            onPress={() => navigation.navigate('MyPetTab')}
          />
          <ItemProfile
            title="History booking."
            body="See your history and change them."
            onPress={() => navigation.navigate('History')}
          />
          <ItemProfile
            title="Logout."
            body="Logout and sign in another account"
            onPress={Logout}
          />
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default ProfileScreen;
