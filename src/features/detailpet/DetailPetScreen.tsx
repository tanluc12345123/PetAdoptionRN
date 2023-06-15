import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import {DetailPetStyles} from './DetailPet.Style';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DetailPetRouteProp} from '../../navigation/route/index';
import {useEffect} from 'react';
import {DetailPetRootProps} from '../../navigation/props/index';
import {SliderBox} from '@empglabs/react-native-image-slider-box';
import {ScrollView} from 'native-base';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import ItemDetail from './components/ItemDetail';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dataType} from '../pet/components/ItemTypePet';
import Button from '../../components/Button/Button';
import {useDetail} from './hooks/useDetail';
import {Service} from '../../data/model/index';
import {LocalStore, LocalStoreKeys} from '../../data/local';

const adoptionProcess = `Before deciding which dog or cat to adopt, ask yourself if you're ready to take on the responsibility of your baby's life, financially, physically, and emotionally. Adoption requires a great deal of consent from yourself as well as your family and stakeholders. Please think twice before contacting us about an adoption.\n\nAre you ready? Please do the following steps:\n\n1️⃣ Book an adoption appointment on our app.\n2️⃣ You can call us to know more about pets.\n3️⃣ Participate in the adoption interview.\n4️⃣ Prepare the facilities, sign the adoption papers and pay the wallet to pick up the baby.\n5️⃣ Regularly update about the baby's situation, especially when there is a problem for timely advice.`;

const DetailPetScreen = () => {
  const route = useRoute<DetailPetRouteProp>();
  const navigation = useNavigation<DetailPetRootProps>();
  const [type, setType] = useState<string>(dataType['Help']);
  const {isLoading, getServices, data, error, getAppointment, dataAppointment} =
    useDetail();
  const [service, setService] = useState<Service>();

  const pet = route.params.pet;
  const images: string[] = [];

  const getType = () => {
    Object.entries(dataType).forEach(entry => {
      const [key, value] = entry;
      if (key === pet?.nameType) {
        setType(value);
      }
    });
  };

  const getImagesPet = () => {
    if (pet?.petImage?.image1) {
      images.push(pet?.petImage.image1);
    }
    if (pet?.petImage?.image2) {
      images.push(pet?.petImage.image2);
    }
    if (pet?.petImage?.image3) {
      images.push(pet?.petImage.image3);
    }
    if (pet?.petImage?.image4) {
      images.push(pet?.petImage.image4);
    }
  };

  const getAppointmentUser = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getAppointment(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getServices();
    getAppointmentUser();
  }, []);

  useEffect(() => {
    getType();
    getImagesPet();
  }, [images]);

  useEffect(() => {
    data?.data.forEach(value => {
      if (value.name === 'Dịch vụ mượn thú cưng') {
        setService(value);
      }
    });
  }, [data, dataAppointment]);

  return (
    <BaseScreen
      style={DetailPetStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.pop()}
          onPressRight={() => {}}
          title="Pet Details"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <SliderBox
          images={images}
          sliderBoxHeight={300}
          autoPlay
          circleLoop
          dotColor="#FFEE58"
          ImageComponentStyle={{borderRadius: 15, width: '90%', marginTop: 10}}
        />
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.electricRed,
            }}>
            {pet?.price}$
          </Text>

          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
              marginTop: 10,
            }}>
            Get to know {pet?.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <ScrollView horizontal>
              <ItemDetail
                title={pet?.gender ? 'Male' : 'Female'}
                children={
                  <MaterialCommunityIcons
                    name={pet?.gender ? 'gender-male' : 'gender-female'}
                    size={30}
                  />
                }
              />
              <ItemDetail
                title="Years"
                children={<Text style={{fontSize: 25}}>{pet?.age}</Text>}
              />
              <ItemDetail
                title={pet?.breed}
                children={<MaterialCommunityIcons name={type} size={30} />}
              />
              <ItemDetail
                title={`${pet?.weight.toString()}Kg`}
                children={<MaterialCommunityIcons name="weight" size={30} />}
              />
              <ItemDetail
                title={pet?.color}
                children={<MaterialCommunityIcons name="palette" size={30} />}
              />
            </ScrollView>
          </View>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
            }}>
            {pet?.name} is
          </Text>
          <View style={{flexDirection: 'row'}}>
            <ItemDetail
              style={{marginRight: 10}}
              title="Sterilization"
              children={
                <MaterialCommunityIcons
                  name={pet?.status.sterilization ? 'check' : 'close'}
                  size={30}
                  style={{
                    color: pet?.status.sterilization
                      ? Colors.seaGreen
                      : Colors.electricRed,
                  }}
                />
              }
            />
            <ItemDetail
              style={{marginRight: 10}}
              title="Rabies Vaccination"
              children={
                <MaterialCommunityIcons
                  name={pet?.status.rabiesVaccination ? 'check' : 'close'}
                  size={30}
                  style={{
                    color: pet?.status.rabiesVaccination
                      ? Colors.seaGreen
                      : Colors.electricRed,
                  }}
                />
              }
            />
            <ItemDetail
              style={{marginRight: 10}}
              title="Vaccination"
              children={
                <MaterialCommunityIcons
                  name={pet?.status.vaccination ? 'check' : 'close'}
                  size={30}
                  style={{
                    color: pet?.status.vaccination
                      ? Colors.seaGreen
                      : Colors.electricRed,
                  }}
                />
              }
            />
            <ItemDetail
              style={{marginRight: 10}}
              title="Safe"
              children={
                <MaterialCommunityIcons
                  name={pet?.status.safe ? 'check' : 'close'}
                  size={30}
                  style={{
                    color: pet?.status.safe
                      ? Colors.seaGreen
                      : Colors.electricRed,
                  }}
                />
              }
            />
          </View>

          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
              marginTop: 30,
            }}>
            Description
          </Text>
          <Text>{pet?.description}</Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
              marginTop: 30,
            }}>
            Adoption process
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_REGULAR,
              color: Colors.darker,
              marginTop: 10,
            }}>
            {adoptionProcess}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Button
          title="Book Appointment"
          disabled={pet.statusAdopt === true}
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('BookingAppointment', {pet: pet})}
        />
        <Button
          title="Hire Pet"
          type="normal"
          disabled={pet.statusAdopt === true || service === null}
          style={{marginLeft: 10}}
          onPress={() => {
            if (service) {
              navigation.navigate('BookService', {
                service: service,
                hire: {pet: route.params.pet},
              });
            }
          }}
        />
      </View>
    </BaseScreen>
  );
};

export default DetailPetScreen;
