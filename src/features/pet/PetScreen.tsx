import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {PetStyles} from './Pet.Style';
import {FlatList, ScrollView} from 'native-base';
import {Pet, TypePet} from '../../data/model/index';
import ItemPet from './components/ItemPet';
import {usePet} from './hooks/usePet';
import {useEffect} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import ItemTypePet from './components/ItemTypePet';
import {Colors} from '../../theme';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {useNavigation} from '@react-navigation/native';
import {HomeTabScreenProps} from '../../navigation/route/index';
import { RootProps } from '../../navigation/props/index';

const PetScreen = () => {
  const navigation = useNavigation<RootProps>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [filterList, setFilterList] = useState<Pet[]>([]);
  const [types, setTypes] = useState<TypePet[]>([]);
  const [value, setValue] = useState<number>(0);
  const {isLoading, getPets, data, error, getTypes, dataType} = usePet();

  const handleSelected = (id: number) => {
    setValue(id);
    filterByType(id);
  };

  const filterByType = (id?: number) => {
    var updateList = [...(pets || [])];
    if (id != undefined) {
      updateList = updateList.filter(item => {
        return item.typeId === id;
      });
    }
    setFilterList(updateList);
  };

  const navigateToDetail = (pet: Pet) => {
    navigation.push('DetailPet', {pet: pet});
  };

  useEffect(() => {
    getPets();
    getTypes();
  }, []);

  useEffect(() => {
    filterByType(value);
  }, [pets, value]);

  useEffect(() => {
    setPets(data?.data || []);
    setFilterList(data?.data || []);
    setTypes(dataType?.data || []);
    setValue(dataType?.data[0]?.id || 0);
    filterByType(dataType?.data[0]?.id);
  }, [data, dataType]);

  return (
    <BaseScreen style={PetStyles.container} isLoading={isLoading} error={error}>
      <View>
        <View style={{marginTop: 10}}>
          <ToolbarHeader
            onPressLeft={() => {}}
            onPressRight={() => {}}
            title="Pet for Adoption"
            iconRight={Drawables.ic_notification}
          />
        </View>
        <ScrollView>
          <View style={{marginBottom: 10, marginTop: 10}}>
            <FlatList
              data={types}
              horizontal
              renderItem={({item}) => (
                <ItemTypePet
                  value={value}
                  type={item}
                  onPress={handleSelected}
                />
              )}
            />
          </View>
          <FlatList
            data={filterList}
            scrollEnabled={false}
            style={{marginBottom: 60}}
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

export default PetScreen;
