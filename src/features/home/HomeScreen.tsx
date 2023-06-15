import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import {useHome} from './hooks/useHome';
import {BaseScreen} from '../../components/BaseScreen';
import {Drawables} from '../../assets/images';
import {HomeStyles} from './Home.Style';
import {Service, Veterinarian, Pet, Volunteering} from '../../data/model/index';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Colors} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, FlatList} from 'native-base';
import ItemServiceHome from './components/ItemServiceHome';
import {Fonts} from '../../assets/fonts/index';
import ItemPet from '../pet/components/ItemPet';
import ItemVeterinarian from '../service/components/ItemVeterinarian';
import ItemVolunteeringActivity from '../volunteering/components/ItemVolunteeringActivity';
import {useNavigation} from '@react-navigation/native';
import {HomeTabScreenProps} from '../../navigation/route/index';
import {LocalStore, LocalStoreKeys} from '../../data/local';
import messaging from '@react-native-firebase/messaging';
import {request, PERMISSIONS} from 'react-native-permissions';
import NotificationController from './components/NotificationController.android';

const HomeScreen = () => {
  const navigation = useNavigation<HomeTabScreenProps<'Home'>['navigation']>();
  const [services, setServices] = useState<Service[]>([]);
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [volunteeringActivities, setVolunteeringActivities] = useState<
    Volunteering[]
  >([]);
  const [name, setName] = useState<string>('');

  const {
    isLoading,
    getServices,
    dataService,
    error,
    getPets,
    dataPet,
    getPetOfUser,
    dataPetOfUser,
    getVeterinarians,
    dataVeterinarian,
    getVolunteeringActivities,
    dataVolunteering,
    saveDeviceToken,
  } = useHome();

  const getName = async () => {
    LocalStore.getData(LocalStoreKeys.Name)
      .then(response => {
        setName(response || '');
      })
      .catch(error => {
        setName('');
      });
  };

  const getPetsUser = async () => {
    const id = await LocalStore.getData(LocalStoreKeys.UseId);
    getPetOfUser(parseInt(id ?? '0'));
  };

  const onPressServiceSeeMore = () => {
    navigation.navigate('Service');
  };

  const onPressPetSeeMore = () => {
    navigation.navigate('Pet');
  };

  const onPressVeterinarianSeeMore = () => {
    navigation.navigate('Service', {
      type: 'Veterinarian',
    });
  };

  const onPressVolunteeringSeeMore = () => {
    navigation.navigate('Volunteering');
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  };

  const requestPermission = async () => {
    const isSaveToken = await LocalStore.getData(LocalStoreKeys.DeviceToken);
    const deviceToken = await checkToken();
    const id = await LocalStore.getData(LocalStoreKeys.UseId);
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
        if (result === 'granted') {
          if (isSaveToken == 'false' || isSaveToken == null) {
            console.log('save');
            saveDeviceToken(deviceToken, parseInt(id ?? '0'));
            LocalStore.setData(LocalStoreKeys.DeviceToken, 'true');
          }
        }
      });
    } else {
      if (isSaveToken == 'false' || isSaveToken == null) {
        console.log('save');
        saveDeviceToken(deviceToken, parseInt(id ?? '0'));
        LocalStore.setData(LocalStoreKeys.DeviceToken, 'true');
      }
    }
  };

  useEffect(() => {
    getServices();
    getPets();
    getVeterinarians();
    getVolunteeringActivities();
    getName();
    getPetsUser();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Messaging handled in the background', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });
    requestPermission();
    checkToken();
    return unsubscribe;
  }, []);

  // Listener event call back data
  useEffect(() => {
    setServices(dataService?.data || []);
    setPets(dataPet?.data.slice(0, 3) || []);
    setVeterinarians(dataVeterinarian?.data.slice(0, 3) || []);
    setVolunteeringActivities(dataVolunteering?.data.slice(0, 3) || []);
  }, [dataService, dataPet, dataVeterinarian, dataVolunteering, dataPetOfUser]);

  return (
    <BaseScreen
      style={HomeStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={{marginTop: 10}}>
          <ToolbarHeader
            onPressLeft={() => {}}
            onPressRight={() => {}}
            isHome
            title="ANIMALIA"
            iconRight={Drawables.ic_notification}
          />
        </View>
        <ScrollView>
          <TouchableOpacity
            style={HomeStyles.search}
            onPress={() => navigation.navigate('Search')}>
            <Text>Search...</Text>
            <View style={{flex: 1, flexDirection: 'column'}}></View>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              style={{color: Colors.darker, justifyContent: 'flex-end'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: Fonts.ROBOTO_REGULAR,
              color: Colors.darker,
              marginVertical: 10,
              fontSize: 20,
            }}>
            Hi {name}!
          </Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_BOLD,
                marginVertical: 10,
                marginLeft: 20,
                fontSize: 25,
              }}>
              Services
            </Text>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                marginStart: 15,
              }}
              onPress={onPressServiceSeeMore}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                style={{color: Colors.primary}}
              />
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  fontSize: 15,
                  color: Colors.primary,
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={services}
            horizontal
            renderItem={({item}) => (
              <ItemServiceHome
                item={item}
                onPress={() =>
                  navigation.push('DetailService', {
                    service: item,
                    onHire: () => {
                      navigation.pop();
                      navigation.navigate('Pet');
                    },
                  })
                }
              />
            )}
          />

          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_BOLD,
                marginVertical: 10,
                marginLeft: 20,
                fontSize: 25,
              }}>
              Pets for adoption
            </Text>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                marginStart: 15,
              }}
              onPress={onPressPetSeeMore}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                style={{color: Colors.primary}}
              />
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  fontSize: 15,
                  color: Colors.primary,
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={pets}
            scrollEnabled={false}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemPet
                pet={item}
                onPress={() => navigation.push('DetailPet', {pet: item})}
              />
            )}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_BOLD,
                marginVertical: 10,
                marginLeft: 20,
                fontSize: 25,
              }}>
              Veterinarians
            </Text>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                marginStart: 15,
              }}
              onPress={onPressVeterinarianSeeMore}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                style={{color: Colors.primary}}
              />
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  fontSize: 15,
                  color: Colors.primary,
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={veterinarians}
            scrollEnabled={false}
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_BOLD,
                marginVertical: 10,
                marginLeft: 20,
                fontSize: 25,
              }}>
              Volunteering Activities
            </Text>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                marginStart: 15,
              }}
              onPress={onPressVolunteeringSeeMore}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                style={{color: Colors.primary}}
              />
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_MEDIUM,
                  fontSize: 15,
                  color: Colors.primary,
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={volunteeringActivities}
            style={{marginBottom: 60}}
            renderItem={({item}) => (
              <ItemVolunteeringActivity
                volunteering={item}
                onPress={() =>
                  navigation.push('DetailVolunteering', {
                    volunteering: item,
                  })
                }
              />
            )}
          />
        </ScrollView>
      </View>
      <NotificationController />
    </BaseScreen>
  );
};

export default HomeScreen;
