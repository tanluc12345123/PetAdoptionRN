import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {} from '../../navigation/route/index';
import {BookVeterinarianRootProp} from '../../navigation/props/index';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {BookVeterinarianStyles} from './BookVeterinarian.Style';
import {ScrollView} from 'native-base';
import InputText from '../../components/InputText/InputText';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useEffect} from 'react';
import Moment from 'moment';
import Button from '../../components/Button/Button';
import {useBookingVeterinarian} from './hooks/useBookVeterinarian';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import {Pet} from '../../data/model/index';
import {BookVeterinarianRouteProp} from '../../navigation/route/index';

var selectedPet: Pet[] = [];

const BookVeterinarianScreen = () => {
  const route = useRoute<BookVeterinarianRouteProp>();
  const navigation = useNavigation<BookVeterinarianRootProp>();

  const {isLoading, getUser, data, error} = useBookingVeterinarian();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [dateVisit, setDateVisit] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [openDateStart, setOpenDateStart] = useState<boolean>(false);
  const [openDateEnd, setOpenDateEnd] = useState<boolean>(false);
  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
    });
  };

  const days = (date_1: Date, date_2: Date) => {
    let difference = Math.abs(date_1.getTime() - date_2.getTime());
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const getTotalPrice = (date_1: Date, date_2: Date) => {
    console.log(days(date_1, date_2));
    console.log(selectedPet.length);
    setTotal((days(date_1, date_2) + 1) * route.params.veterinarian.price);
  };

  useEffect(() => {
    getUserLocal();
    getTotalPrice(dateVisit, dateEnd);
  }, []);

  useEffect(() => {
    setName(data?.data.fullName ?? '');
    setEmail(data?.data.email ?? '');
    setPhone(data?.data.phone ?? '');
    setAddress(data?.data.address ?? '');
  }, [data]);

  return (
    <BaseScreen
      style={BookVeterinarianStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="Book Service Process"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <View style={{flexDirection: 'column', marginHorizontal: 30}}>
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
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  marginLeft: 20,
                  marginBottom: 4,
                }}>
                Date start
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
                onPress={() => setOpenDateStart(true)}>
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
                Date end
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
                onPress={() => setOpenDateEnd(true)}>
                <Text>{Moment(dateEnd).format('DD/MM/yyyy')}</Text>
              </Pressable>
            </View>
          </View>

          <InputText
            style={{marginTop: 20}}
            title={'Total Price'}
            value={total.toString()}
            onChange={() => {}}
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
          title="Next"
          type="submit"
          style={{marginLeft: 10}}
          onPress={() => {
            navigation.navigate('PaymentVeterinarian', {
              bookVeterinarian: {
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
                veterinarian: route.params.veterinarian,
                dateStart: Moment(dateVisit).format('DD/MM/yyyy'),
                dateEnd: Moment(dateEnd).format('DD/MM/yyyy'),
                payment: false,
                totalPrice: total,
              },
            });
          }}
        />
      </View>
      {openDateStart && (
        <RNDateTimePicker
          value={dateVisit}
          minimumDate={new Date()}
          onChange={(event, date) => {
            setOpenDateStart(false);
            setDateVisit(date ?? new Date());
            getTotalPrice(date ?? new Date(), dateEnd);
          }}
        />
      )}
      {openDateEnd && (
        <RNDateTimePicker
          value={dateEnd}
          minimumDate={new Date()}
          onChange={(event, date) => {
            setOpenDateEnd(false);
            setDateEnd(date ?? new Date());
            getTotalPrice(dateVisit, date ?? new Date());
          }}
        />
      )}
    </BaseScreen>
  );
};

export default BookVeterinarianScreen;
