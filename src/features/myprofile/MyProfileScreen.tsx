import {Text, View, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BaseScreen} from '../../components/BaseScreen';
import {useProfile} from './hooks/useProfile';
import {HomeTabScreenProps} from '../../navigation/route/index';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import {Image} from 'react-native';
import {useEffect, useState} from 'react';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import {Colors} from '../../theme';
import {MyProfileStyles} from './MyProfile.Style';
import InputText from '../../components/InputText/InputText';
import Button from '../../components/Button/Button';
import {MyProfileRootProp} from '../../navigation/props/index';
import {ScrollView, Select} from 'native-base';
import {Fonts} from '../../assets/fonts/index';
import {Pressable} from 'react-native';
import Moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import {UpdateUserRequest} from '../../data/model/index';

const MyProfileScreen = () => {
  const navigation = useNavigation<MyProfileRootProp>();
  const {
    isLoading,
    error,
    data,
    getUser,
    updateInformation,
    dataUpdate,
    dataAvatar,
    updateAvatarUser,
  } = useProfile();

  const [avatar, setAvatar] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [address, setAddress] = useState<string | undefined>('');
  const [career, setCareer] = useState<string | undefined>('');
  const [gender, setGender] = useState<boolean | undefined>(true);
  const [openDate, setOpenDate] = useState<boolean | undefined>(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>(new Date());
  const [photo, setPhoto] = useState<any>();

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
    });
  };

  const updateInformationOfUser = () => {
    const body: UpdateUserRequest = {
      fullName: name ?? '',
      email: email ?? '',
      gender: gender ?? true,
      birthday: Moment(birthDay).format('DD/MM/yyyy'),
      phone: phone ?? '',
      address: address ?? '',
      career: career ?? '',
    };
    updateInformation(data?.data.id ?? 0, body);
  };

  const updateAvatar = () => {
    const form = new FormData();
    if (photo?.assets?.length > 0) {
      form.append('file', {
        uri: photo.assets[0].uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      updateAvatarUser(data?.data.id ?? 0, form);
    }
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    if (dataUpdate?.status === 'Success') {
      console.log(dataUpdate.data)
      Alert.alert('Update!', 'Update Successful!', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  }, [dataUpdate]);

  useEffect(() => {
    setAvatar(data?.data.avatar);
    setName(data?.data.fullName);
    setAddress(data?.data.address);
    setPhone(data?.data.phone);
    setEmail(data?.data.email);
    setGender(data?.data.gender);
    setBirthDay(data?.data.birthday);
    setCareer(data?.data.career);
  }, [data]);

  return (
    <BaseScreen
      isLoading={isLoading}
      error={error}
      style={MyProfileStyles.container}>
      <View style={{marginTop: 10}}>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="My profile"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 10,
            marginTop: 30,
          }}>
          <Pressable onPress={handleChoosePhoto}>
            {photo && photo?.assets?.length > 0 ? (
              <Image
                source={{uri: photo?.assets[0]?.uri}}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignSelf: 'center',
                }}
              />
            ) : avatar ? (
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
          </Pressable>

          <InputText
            style={{marginTop: 10}}
            title={'Name'}
            value={name}
            onChange={value => setName(value)}
            onPressShowPassword={() => {}}
          />
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 15,
              marginTop: 20,
              marginStart: 20,
            }}>
            Gender
          </Text>
          <Select
            selectedValue={gender ? 'true' : 'false'}
            onValueChange={value => setGender(value === 'true' ? true : false)}>
            <Select.Item value="true" label="Male" />
            <Select.Item value="false" label="Female" />
          </Select>
          <InputText
            style={{marginTop: 20}}
            title={'Email'}
            value={email}
            onChange={value => setEmail(value)}
            onPressShowPassword={() => {}}
          />
          <InputText
            style={{marginTop: 20}}
            title={'Phone number'}
            value={phone}
            onChange={value => setPhone(value)}
            onPressShowPassword={() => {}}
          />
          <InputText
            style={{marginTop: 20}}
            title={'Address'}
            value={address}
            onChange={value => setAddress(value)}
            onPressShowPassword={() => {}}
          />
          <InputText
            style={{marginTop: 20}}
            title={'Career'}
            value={career}
            onChange={value => setCareer(value)}
            onPressShowPassword={() => {}}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 30,
          }}>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              marginLeft: 30,
              marginBottom: 4,
            }}>
            Birthday
          </Text>
          <Pressable
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: Colors.silverSand,
              paddingVertical: 10,
              borderRadius: 6,
              marginStart: 10,
            }}
            onPress={() => setOpenDate(true)}>
            <Text style={{marginStart: 10, color: Colors.darker}}>
              {Moment(birthDay).format('DD/MM/yyyy')}
            </Text>
          </Pressable>
          <View style={{height: 50}}></View>
        </View>
      </ScrollView>
      <Button
        title="Update information"
        style={{width: '90%', position: 'absolute', bottom: 0, margin: 20}}
        onPress={() => {
          updateInformationOfUser();
          updateAvatar();
        }}
      />
      {openDate && (
        <RNDateTimePicker
          value={birthDay ?? new Date()}
          display="spinner"
          maximumDate={new Date()}
          onChange={(event, date) => {
            setOpenDate(false);
            setBirthDay(date || new Date());
          }}
        />
      )}
    </BaseScreen>
  );
};

export default MyProfileScreen;
