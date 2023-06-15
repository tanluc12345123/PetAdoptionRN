import {View, Text, Pressable, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BookingAppointmentRouteProp,
  BookServiceRouteProp,
} from '../../navigation/route/index';
import {
  BookingAppointmentRootProps,
  BookServiceRootProp,
} from '../../navigation/props/index';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {BookServiceStyles} from './BookService.Style';
import {ScrollView} from 'native-base';
import InputText from '../../components/InputText/InputText';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useEffect} from 'react';
import Moment from 'moment';
import Button from '../../components/Button/Button';
import {useBookService} from './hooks/useBookService';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import ItemPetSelection from '../pet/components/ItemPetSelection';
import {Pet} from '../../data/model/index';
import AddPetScreen from '../addpet/AddPetScreen';
import {remove} from '../../utils/arrayUtil';

var selectedPet: Pet[] = [];

const BookServiceScreen = () => {
  const route = useRoute<BookServiceRouteProp>();
  const navigation = useNavigation<BookServiceRootProp>();

  const [pets, setPets] = useState<Pet[]>([]);
  const [petBooking, setPetBooking] = useState<Pet[]>([]);

  const {isLoading, getUser, data, error, dataPet, getPetOfUser} =
    useBookService();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [dateVisit, setDateVisit] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [openDateStart, setOpenDateStart] = useState<boolean>(false);
  const [openTimeStart, setOpenTimeStart] = useState<boolean>(false);
  const [openDateEnd, setOpenDateEnd] = useState<boolean>(false);
  const [openTimeEnd, setOpenTimeEnd] = useState<boolean>(false);

  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
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
    if (route.params.service.typeService === 'SERVICE_BY_DAY') {
      if (route.params.hire) {
        setTotal((days(date_1, date_2) + 1) * route.params.service.price);
      } else {
        setTotal(
          (days(date_1, date_2) + 1) *
            route.params.service.price *
            selectedPet.length,
        );
      }
    } else {
      setTotal(route.params.service.price * selectedPet.length);
    }
  };

  const getPetsUser = async () => {
    const id = await LocalStore.getData(LocalStoreKeys.UseId);
    getPetOfUser(parseInt(id ?? '0'));
  };

  useEffect(() => {
    getUserLocal();
    getTotalPrice(dateVisit, dateEnd);
    getPetsUser();
  }, []);

  useEffect(() => {
    setName(data?.data.fullName ?? '');
    setEmail(data?.data.email ?? '');
    setPhone(data?.data.phone ?? '');
    setAddress(data?.data.address ?? '');
    setPets(dataPet?.data ?? []);
  }, [data, dataPet]);

  return (
    <BaseScreen
      style={BookServiceStyles.container}
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
                onPress={() => setOpenTimeStart(true)}>
                <Text>{Moment(dateVisit).format('h:mm a')}</Text>
              </Pressable>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  marginLeft: 20,
                  marginBottom: 4,
                }}>
                Visiting date end
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
                onPress={() => setOpenDateEnd(true)}>
                <Text>{Moment(dateEnd).format('DD/MM/yyyy')}</Text>
              </Pressable>
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  marginLeft: 20,
                  marginBottom: 4,
                }}>
                Visiting time end
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
                onPress={() => setOpenTimeEnd(true)}>
                <Text>{Moment(dateEnd).format('h:mm a')}</Text>
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
          {route.params.hire != null ? null : (
            <>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  fontSize: 15,
                  marginTop: 20,
                }}>
                Select pets:
              </Text>
              <FlatList
                data={pets}
                scrollEnabled={false}
                style={{marginBottom: 40}}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={({item}) => (
                  <ItemPetSelection
                    pet={item}
                    onChange={value => {
                      if (value) {
                        selectedPet.push(item);
                      } else {
                        selectedPet = remove(selectedPet, item);
                      }
                      setPetBooking(selectedPet);
                      console.log(selectedPet);
                      getTotalPrice(dateVisit, dateEnd);
                    }}
                  />
                )}
              />
              <Button
                title="Add pet"
                style={{width: '100%', marginBottom: 10, alignSelf: 'center'}}
                onPress={() => setOpenModalAdd(true)}
              />
            </>
          )}
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
            navigation.navigate('PaymentService', {
              bookService: {
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
                pets: route.params.hire != null ? [route.params.hire.pet] : petBooking,
                startDay: Moment(dateVisit).format('DD/MM/yyyy'),
                visitingTimeStart: Moment(dateVisit).format('h:mm'),
                endDate: Moment(dateEnd).format('DD/MM/yyyy'),
                visitingTimeEnd: Moment(dateEnd).format('h:mm'),
                payment: false,
                service: route.params.service,
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
      {openTimeStart && (
        <RNDateTimePicker
          value={dateVisit}
          mode="time"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setOpenTimeStart(false);
            setDateVisit(date ?? new Date());
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
      {openTimeEnd && (
        <RNDateTimePicker
          value={dateEnd}
          mode="time"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setOpenTimeEnd(false);
            setDateEnd(date ?? new Date());
          }}
        />
      )}
      <AddPetScreen
        visible={openModalAdd}
        onDismiss={() => setOpenModalAdd(false)}
        onRequestClose={() => setOpenModalAdd(false)}
        onSuccess={() => {
          Alert.alert('Add Pet', 'Add Pet Successful!');
          setOpenModalAdd(false);
          getPetsUser();
        }}
      />
    </BaseScreen>
  );
};

export default BookServiceScreen;
