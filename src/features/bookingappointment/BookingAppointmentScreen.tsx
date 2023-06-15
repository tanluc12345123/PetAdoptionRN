import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BookingAppointmentRouteProp} from '../../navigation/route/index';
import {BookingAppointmentRootProps} from '../../navigation/props/index';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {BookingAppointmentStyles} from './BookingAppointment.Style';
import {ScrollView} from 'native-base';
import InputText from '../../components/InputText/InputText';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useEffect} from 'react';
import Moment from 'moment';
import Button from '../../components/Button/Button';
import {useAppointment} from './hooks/useAppointment';
import {LocalStore, LocalStoreKeys} from '../../data/local';

const BookingAppointmentScreen = () => {
  const route = useRoute<BookingAppointmentRouteProp>();
  const navigation = useNavigation<BookingAppointmentRootProps>();

  const {isLoading, getUser, data, error} = useAppointment();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [dateVisit, setDateVisit] = useState<Date>(new Date());
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<boolean>(false);

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    setName(data?.data.fullName ?? '');
    setEmail(data?.data.email ?? '');
    setPhone(data?.data.phone ?? '');
    setAddress(data?.data.address ?? '');
  }, [data]);

  return (
    <BaseScreen
      style={BookingAppointmentStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="Appointment Process"
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
            Step 1: Appointment
          </Text>
          <InputText
            style={{marginTop: 30}}
            title={'Name of visitor'}
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
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  marginLeft: 20,
                  marginBottom: 4,
                }}>
                Visiting date
              </Text>
              <Pressable
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: Colors.silverSand,
                  paddingVertical: 10,
                  borderRadius: 6,
                  marginEnd: 5,
                  alignItems: 'center',
                }}
                onPress={() => setOpenDate(true)}>
                <Text>{Moment(dateVisit).format('DD/MM/yyyy')}</Text>
              </Pressable>
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  marginLeft: 20,
                  marginBottom: 4,
                }}>
                Visiting time
              </Text>
              <Pressable
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: Colors.silverSand,
                  paddingVertical: 10,
                  borderRadius: 6,
                  marginStart: 5,
                  alignItems: 'center',
                }}
                onPress={() => setOpenTime(true)}>
                <Text>{Moment(dateVisit).format('h:mm a')}</Text>
              </Pressable>
            </View>
          </View>
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
            navigation.navigate('Payment', {
              bookingAppointment: {
                user: {
                  id: data?.data.id ?? 0,
                  fullName: name,
                  address: address,
                  phone: phone,
                  email: email,
                  gender: data?.data.gender ?? true,
                  birthday: data?.data.birthday ?? new Date(),
                  career: data?.data.career ?? '',
                  avatar: '',
                },
                pet: route.params.pet,
                visitingDate: Moment(dateVisit).format('DD/MM/yyyy'),
                visitingTime: Moment(dateVisit).format('h:mm a'),
                payment: false,
              },
            })
          }
        />
      </View>
      {openDate && (
        <RNDateTimePicker
          value={dateVisit}
          minimumDate={new Date()}
          onChange={(event, date) => {
            setOpenDate(false);
            setDateVisit(date || new Date());
          }}
        />
      )}
      {openTime && (
        <RNDateTimePicker
          value={dateVisit}
          mode="time"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setOpenTime(false);
            setDateVisit(date || new Date());
          }}
        />
      )}
    </BaseScreen>
  );
};

export default BookingAppointmentScreen;
