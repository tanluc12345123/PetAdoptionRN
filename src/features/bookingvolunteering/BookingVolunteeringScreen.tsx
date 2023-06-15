import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BookVolunteeringRouteProp} from '../../navigation/route/index';
import {BookVolunteeringRootProp} from '../../navigation/props/index';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {BookingVolunteeringStyles} from './BookingVolunteering.Style';
import {ScrollView} from 'native-base';
import InputText from '../../components/InputText/InputText';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import {useEffect} from 'react';
import Button from '../../components/Button/Button';
import {useVolunteering} from './hooks/useVolunteering';
import {LocalStore, LocalStoreKeys} from '../../data/local';

const BookingVolunteeringScreen = () => {
  const route = useRoute<BookVolunteeringRouteProp>();
  const navigation = useNavigation<BookVolunteeringRootProp>();

  const {isLoading, getUser, data, error, dataBook, registerVolunteering} =
    useVolunteering();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    if (dataBook?.status === 'Success') {
      navigation.navigate('ConfirmVolunteering', {
        booking: dataBook?.data,
        onRefresh: () => {},
      });
    }
  }, [dataBook]);

  useEffect(() => {
    setName(data?.data.fullName ?? '');
    setEmail(data?.data.email ?? '');
    setPhone(data?.data.phone ?? '');
    setAddress(data?.data.address ?? '');
  }, [data]);

  return (
    <BaseScreen
      style={BookingVolunteeringStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="Booking Process"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <View style={{flexDirection: 'column', marginHorizontal: 30}}>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 18,
              color: Colors.primary,
              marginTop: 30,
            }}>
            Step 1: Booking
          </Text>
          <InputText
            style={{marginTop: 30}}
            title={'Name'}
            value={name}
            onChange={value => setName(value)}
            onPressShowPassword={() => {}}
          />
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
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
          marginTop: 10,
        }}>
        <Button
          title="Cancel"
          type="cancel"
          style={{marginRight: 10}}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Submit"
          type="submit"
          style={{marginLeft: 10}}
          onPress={() =>
            registerVolunteering(
              data?.data.id ?? 0,
              route.params.volunteering.id,
            )
          }
        />
      </View>
    </BaseScreen>
  );
};

export default BookingVolunteeringScreen;
