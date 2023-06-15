import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import {ServiceStyles} from './Service.Style';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import ItemService from './components/ItemService';
import ItemTypeService from './components/ItemTypeService';
import {useService} from './hooks/useService';
import {useEffect} from 'react';
import {Service, Veterinarian} from '../../data/model/index';
import {ScrollView} from 'native-base';
import ItemVeterinarian from './components/ItemVeterinarian';
import {useRoute, useNavigation} from '@react-navigation/native';
import {HomeTabScreenProps} from '../../navigation/route/index';
import {RootProps} from '../../navigation/props/index';

const ServiceScreen = () => {
  const route = useRoute<HomeTabScreenProps<'Service'>['route']>();
  const navigation = useNavigation<RootProps>();
  const [services, setServices] = useState<Service[]>([]);
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const types = ['Service', 'Veterinarian'];
  const [value, setValue] = useState<string>('Service');
  const {
    isLoading,
    getServices,
    data,
    error,
    getVeterinarians,
    dataVeterinarian,
  } = useService();

  const handleSelected = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(route.params?.type ? route.params?.type : 'Service');
  }, [route.params]);

  useEffect(() => {
    getServices();
    getVeterinarians();
  }, []);

  useEffect(() => {
    setServices(data?.data || []);
    setVeterinarians(dataVeterinarian?.data || []);
  }, [data, dataVeterinarian]);

  return (
    <BaseScreen
      style={ServiceStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={{marginTop: 10}}>
          <ToolbarHeader
            onPressLeft={() => {}}
            onPressRight={() => {}}
            title="Service"
            iconRight={Drawables.ic_notification}
          />
        </View>
        <ScrollView>
          <View style={{marginBottom: 10, marginTop: 10, paddingLeft: 10}}>
            <FlatList
              data={types}
              horizontal
              renderItem={({item}) => (
                <ItemTypeService
                  title={item}
                  value={value}
                  onPress={handleSelected}
                />
              )}
            />
          </View>
          {value === 'Service' && (
            <FlatList
              data={services}
              scrollEnabled={false}
              style={{marginBottom: 60}}
              renderItem={({item}) => (
                <ItemService
                  service={item}
                  onPress={() =>
                    navigation.push('DetailService', {
                      service: item,
                      onHire: () =>
                        navigation.navigate('HomeTab', {screen: 'Pet'}),
                    })
                  }
                />
              )}
            />
          )}
          {value === 'Veterinarian' && (
            <FlatList
              data={veterinarians}
              scrollEnabled={false}
              style={{marginBottom: 60}}
              renderItem={({item}) => (
                <ItemVeterinarian
                  veterinarian={item}
                  onPress={() =>
                    navigation.push('DetailVeterinarian', {
                      veterinarian: item,
                    })
                  }
                />
              )}
            />
          )}
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default ServiceScreen;
