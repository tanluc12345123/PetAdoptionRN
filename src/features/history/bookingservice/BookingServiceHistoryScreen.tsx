import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {BookingServiceHistoryStyles} from './BookingServiceHistory.Style';
import {FlatList, ScrollView} from 'native-base';
import {
  Pet,
  TypePet,
  BookingAppointment,
  BookService,
} from '../../../data/model/index';
import {useBookingServiceHistory} from './hooks/useBookingServiceHistory';
import {useEffect} from 'react';
import {BaseScreen} from '../../../components/BaseScreen';
import {useNavigation} from '@react-navigation/native';
import {HistoryRootProp} from '../../../navigation/props/index';
import ItemBooking from './components/ItemBooking';
import {LocalStore, LocalStoreKeys} from '../../../data/local';

const BookingServiceHistoryScreen = () => {
  const navigation = useNavigation<HistoryRootProp>();
  const [bookService, setBookService] = useState<BookService[]>([]);
  const {isLoading, getBookServiceUser, data, error} =
    useBookingServiceHistory();

  const getBookingServiceUser = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getBookServiceUser(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getBookingServiceUser();
  }, []);

  useEffect(() => {
    setBookService(data?.data || []);
  }, [data]);

  return (
    <BaseScreen
      style={BookingServiceHistoryStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ScrollView>
          <FlatList
            data={bookService}
            scrollEnabled={false}
            style={{marginTop: 40}}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemBooking
                book={item}
                onPress={() =>
                  navigation.navigate('ConfirmService', {
                    bookingService: item,
                    pets: [item.pet],
                    edit: true,
                    onRefresh: () => getBookingServiceUser(),
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

export default BookingServiceHistoryScreen;
