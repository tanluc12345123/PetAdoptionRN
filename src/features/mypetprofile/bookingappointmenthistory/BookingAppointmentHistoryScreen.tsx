import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {BookingAppointmentHistoryStyles} from './BookingAppointmentHistory.Style';
import {FlatList, ScrollView} from 'native-base';
import {Pet, TypePet, BookingAppointment} from '../../../data/model/index';
import {usePet} from './hooks/usePet';
import {useEffect} from 'react';
import {BaseScreen} from '../../../components/BaseScreen';
import {useNavigation} from '@react-navigation/native';
import {MyPetProfileRootProp} from '../../../navigation/props/index';
import ItemBooking from './components/ItemBooking';
import {LocalStore, LocalStoreKeys} from '../../../data/local';

const BookingAppointmentHistoryScreen = () => {
  const navigation = useNavigation<MyPetProfileRootProp>();
  const [appointments, setAppointments] = useState<BookingAppointment[]>([]);
  const {isLoading, getAppointment, data, error} = usePet();

  const getAppointmentUser = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getAppointment(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getAppointmentUser();
  }, []);

  useEffect(() => {
    setAppointments(data?.data || []);
  }, [data]);

  return (
    <BaseScreen
      style={BookingAppointmentHistoryStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ScrollView>
          <FlatList
            data={appointments}
            scrollEnabled={false}
            style={{marginTop: 40}}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemBooking
                book={item}
                onPress={() =>
                  navigation.navigate('ConfirmPet', {
                    bookingAppointment: item,
                    edit: true,
                    onRefresh: () => getAppointmentUser(),
                  })
                }
              />
            )}
          />
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default BookingAppointmentHistoryScreen;
