import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BaseScreen} from '../../components';
import {AddPetStyles} from './AddPet.Style';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import {ScrollView, Select} from 'native-base';
import InputText from '../../components/InputText/InputText';
import {Fonts} from '../../assets/fonts/index';
import {useAddPetUser} from './hooks/useAddPet';
import {useEffect} from 'react';
import {TypePet, Pet} from '../../data/model/index';
import {Picker} from '@react-native-picker/picker';
import Button from '../../components/Button/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {LocalStore, LocalStoreKeys} from '../../data/local';

type Props = {
  visible: boolean;
  onDismiss(): void;
  onRequestClose(): void;
  onSuccess(): void;
  pet?: Pet;
  title?: string;
};
const AddPetScreen = ({
  visible,
  onDismiss,
  onRequestClose,
  onSuccess,
  pet,
  title,
}: Props) => {
  //   const navigation = useNavigation<AddPetRootProp>();
  const [photo, setPhoto] = useState<any>();
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<boolean>(true);
  const [types, setTypes] = useState<TypePet[]>([]);
  const [type, setType] = useState<number>();

  const {
    isLoading,
    getTypes,
    error,
    dataType,
    data,
    addPetFunc,
    dataUpdate,
    updatePetUser,
  } = useAddPetUser();

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleAddPet = async () => {
    const body = {
      name: name,
      gender: gender,
      breed: breed,
      color: color,
      age: null,
      weight: weight,
      price: null,
      description: null,
      dateReceived: null,
      status: {
        sterilization: false,
        rabiesVaccination: false,
        vaccination: false,
        safe: false
      },
    };
    let form = new FormData();
    form.append('body', {
      string: JSON.stringify(body), //This is how it works :)
      type: 'application/json',
    });
    form.append(
      'file1',
      photo
        ? {
            uri: photo.assets[0].uri,
            name: 'image.jpg',
            type: 'image/jpeg',
          }
        : null,
    );
    form.append('file2', null);
    form.append('file3', null);
    form.append('file4', null);
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      if (pet) {
        updatePetUser(pet.id, type ?? 0, form);
      } else {
        addPetFunc({
          body: form,
          idType: type ?? 0,
          idUser: parseInt(response ?? '0'),
        });
      }
    });
  };

  useEffect(() => {
    getTypes();
    setName(pet?.name ?? '');
    setBreed(pet?.breed ?? '');
    setGender(pet?.gender ?? true);
    setWeight(pet?.weight?.toString() ?? '');
    setColor(pet?.color ?? '');
    setImage(pet?.petImage?.image1 ?? '');
  }, [pet]);

  useEffect(() => {
    setTypes(dataType?.data ?? []);
    setType(pet?.typeId ?? dataType?.data[0].id ?? 0);
    if (data?.status === 'Success') {
      onSuccess();
    }
    if (dataUpdate?.status === 'Success') {
      onSuccess();
    }
    console.log(dataUpdate)
  }, [dataType, data, dataUpdate]);

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onRequestClose}>
      <BaseScreen
        style={AddPetStyles.container}
        isLoading={isLoading}
        error={error}>
        <View>
          <ToolbarHeader
            onPressLeft={onDismiss}
            onPressRight={() => {}}
            title={title ? title : 'Add new pet'}
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
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                marginTop: 20,
                marginStart: 20,
              }}>
              Gender
            </Text>
            <Select
              selectedValue={gender ? 'true' : 'false'}
              onValueChange={value =>
                setGender(value === 'true' ? true : false)
              }>
              <Select.Item value="true" label="Male" />
              <Select.Item value="false" label="Female" />
            </Select>
            <InputText
              style={{marginTop: 20}}
              title={'Breed'}
              value={breed}
              onChange={value => setBreed(value)}
              onPressShowPassword={() => {}}
            />
            <InputText
              style={{marginTop: 20}}
              title={'Color'}
              value={color}
              onChange={value => setColor(value)}
              onPressShowPassword={() => {}}
            />
            <InputText
              style={{marginTop: 20}}
              title={'Weight'}
              value={weight}
              onChange={value => setWeight(value)}
              onPressShowPassword={() => {}}
            />
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                marginTop: 20,
                marginStart: 20,
              }}>
              Type
            </Text>
            <Picker
              selectedValue={type?.toString()}
              onValueChange={value => setType(parseInt(value))}>
              {types.map((value, index) => (
                <Picker.Item
                  value={value.id.toString()}
                  label={value.nameType}
                  key={index}
                />
              ))}
            </Picker>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  marginStart: 20,
                }}
                onPress={handleChoosePhoto}>
                <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, fontSize: 15}}>
                  Choose photo
                </Text>
              </TouchableOpacity>
              {photo && photo?.assets?.length > 0 ? (
                <Image
                  source={{uri: photo?.assets[0]?.uri}}
                  style={{width: 100, height: 100, marginStart: 10}}
                />
              ) : (
                image && (
                  <Image
                    source={{uri: image}}
                    style={{
                      width: 100,
                      height: 100,
                      marginStart: 10,
                    }}
                  />
                )
              )}
            </View>
          </View>
        </ScrollView>
        <Button
          title={title ? title : 'Add pet'}
          type="submit"
          style={{width: '80%', marginBottom: 20, alignSelf: 'center'}}
          onPress={handleAddPet}
        />
      </BaseScreen>
    </Modal>
  );
};

export default AddPetScreen;
