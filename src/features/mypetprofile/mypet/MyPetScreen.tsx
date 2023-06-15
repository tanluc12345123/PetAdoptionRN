import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {MyPetStyles} from './MyPet.Style';
import {FlatList, ScrollView} from 'native-base';
import {Pet} from '../../../data/model/index';
import {useMyPet} from './hooks/useMyPet';
import {useEffect} from 'react';
import {BaseScreen} from '../../../components/BaseScreen';
import {useNavigation} from '@react-navigation/native';
import {MyPetProfileRootProp} from '../../../navigation/props/index';
import {LocalStore, LocalStoreKeys} from '../../../data/local';
import ItemPet from '../../pet/components/ItemPet';
import AddPetScreen from '../../addpet/AddPetScreen';

const MyPetScreen = () => {
  const navigation = useNavigation<MyPetProfileRootProp>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [pet, setPet] = useState<Pet>();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const {isLoading, getUser, data, error, dataPet, getPetOfUser} = useMyPet();

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getUser(parseInt(response ?? '0'));
      getPetOfUser(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    setPets(dataPet?.data || []);
  }, [data, dataPet]);

  return (
    <BaseScreen
      style={MyPetStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ScrollView>
          <FlatList
            data={pets}
            scrollEnabled={false}
            style={{marginTop: 40}}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemPet
                pet={item}
                onPress={() => {
                  setPet(item);
                  setOpenEdit(true);
                }}
              />
            )}
          />
        </ScrollView>
      </View>
      <AddPetScreen
        visible={openEdit}
        onDismiss={() => setOpenEdit(false)}
        onRequestClose={() => setOpenEdit(false)}
        onSuccess={() => {
          setOpenEdit(false);
          getUserLocal();
        }}
        pet={pet}
        title="Edit pet"
      />
    </BaseScreen>
  );
};

export default MyPetScreen;
