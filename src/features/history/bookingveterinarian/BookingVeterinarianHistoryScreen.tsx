import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {BookingVeterinarianHistoryStyles} from './BookingVeterinarianHistory.Style';
import {FlatList, ScrollView} from 'native-base';
import {Pet, BookVeterinarian} from '../../../data/model/index';
import {useBookingVeterinarian} from './hooks/useBookingVeterinarian';
import {useEffect} from 'react';
import {BaseScreen} from '../../../components/BaseScreen';
import {useNavigation} from '@react-navigation/native';
import {HistoryRootProp} from '../../../navigation/props/index';
import {LocalStore, LocalStoreKeys} from '../../../data/local';
import ItemBooking from './components/ItemBooking';

const BookingVeterinarianHistoryScreen = () => {
  const navigation = useNavigation<HistoryRootProp>();
  const [bookVeterinarian, setBookVeterinarian] = useState<BookVeterinarian[]>(
    [],
  );
  const {isLoading, getBookVeterinarian, data, error} =
    useBookingVeterinarian();

  const getBookingVeterinarianUser = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getBookVeterinarian(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getBookingVeterinarianUser();
  }, []);

  useEffect(() => {
    setBookVeterinarian(data?.data || []);
  }, [data]);

  return (
    <BaseScreen
      style={BookingVeterinarianHistoryStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ScrollView>
          <FlatList
            data={bookVeterinarian}
            scrollEnabled={false}
            style={{marginTop: 40}}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemBooking
                book={item}
                onPress={() =>
                  navigation.navigate('ConfirmVeterinarian', {
                    bookingVeterinarian: item,
                    edit: true,
                    onRefresh: () => getBookingVeterinarianUser(),
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

export default BookingVeterinarianHistoryScreen;
