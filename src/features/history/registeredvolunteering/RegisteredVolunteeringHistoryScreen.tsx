import {View} from 'react-native';
import React, {useState} from 'react';
import {RegisteredVolunteeringHistoryStyles} from './RegisteredVolunteeringHistory.Style';
import {FlatList, ScrollView} from 'native-base';
import {BookVolunteering, Pet} from '../../../data/model/index';
import {useRegisteredVolunteering} from './hooks/useRegisteredVolunteering';
import {useEffect} from 'react';
import {BaseScreen} from '../../../components/BaseScreen';
import {useNavigation} from '@react-navigation/native';
import {HistoryRootProp} from '../../../navigation/props/index';
import {LocalStore, LocalStoreKeys} from '../../../data/local';
import ItemBooking from './components/ItemBooking';

const RegisteredVolunteeringHistoryScreen = () => {
  const navigation = useNavigation<HistoryRootProp>();
  const [registered, setRegistered] = useState<BookVolunteering[]>([]);
  const {isLoading, getRegistered, data, error} = useRegisteredVolunteering();

  const getRegisteredVolunteeringUser = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getRegistered(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getRegisteredVolunteeringUser();
  }, []);

  useEffect(() => {
    setRegistered(data?.data || []);
  }, [data]);

  return (
    <BaseScreen
      style={RegisteredVolunteeringHistoryStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ScrollView>
          <FlatList
            data={registered}
            scrollEnabled={false}
            style={{marginTop: 40}}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemBooking
                book={item}
                onPress={() =>
                  navigation.navigate('ConfirmVolunteering', {
                    booking: item,
                    edit: true,
                    onRefresh: () => getRegisteredVolunteeringUser(),
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

export default RegisteredVolunteeringHistoryScreen;
