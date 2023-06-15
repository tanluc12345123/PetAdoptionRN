import {View} from 'react-native';
import React, {useState} from 'react';
import {PetAdoptionStyles} from './PetAdoption.Style';
import {FlatList, ScrollView} from 'native-base';
import {Pet} from '../../../data/model/index';
import {usePetsAdoption} from './hooks/usePetAdoption';
import {useEffect} from 'react';
import {BaseScreen} from '../../../components/BaseScreen';
import {useNavigation} from '@react-navigation/native';
import ItemPet from '../../pet/components/ItemPet';
import {MyPetProfileRootProp} from '../../../navigation/props/index';
import {LocalStore, LocalStoreKeys} from '../../../data/local';

const PetAdoptionScreen = () => {
  const navigation = useNavigation<MyPetProfileRootProp>();
  const [pets, setPets] = useState<Pet[]>([]);
  const {isLoading, error, getPetAdoption, dataAdoption} = usePetsAdoption();

  const navigateToDetail = (pet: Pet) => {
    navigation.push('DetailPet', {pet: pet});
  };

  const getUserLocal = async () => {
    await LocalStore.getData(LocalStoreKeys.UseId).then(response => {
      getPetAdoption(parseInt(response ?? '0'));
    });
  };

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    setPets(dataAdoption?.data || []);
  }, [dataAdoption]);

  return (
    <BaseScreen
      style={PetAdoptionStyles.container}
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
              <ItemPet pet={item} onPress={() => navigateToDetail(item)} />
            )}
          />
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default PetAdoptionScreen;
