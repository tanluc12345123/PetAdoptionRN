import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import {SearchStyles} from './Search.Style';
import {SearchBar} from '@rneui/base';
import {Colors} from '../../theme';
import {useSearch} from './hooks/useSearch';
import {Pet, TypePet} from '../../data/model/index';
import ItemPet from '../pet/components/ItemPet';
import {useNavigation} from '@react-navigation/native';
import {SearchRootProp} from '../../navigation/props/index';
import {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import ItemTypePet from '../pet/components/ItemTypePet';
import {Fonts} from '../../assets/fonts/index';
import {Select, Slider, ScrollView} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SearchScreen = () => {
  const navigation = useNavigation<SearchRootProp>();
  const [search, setSearch] = useState<string>('');
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [types, setTypes] = useState<TypePet[]>([]);
  const [value, setValue] = useState<number>(0);
  const [valueAgeLow, setValueAgeLow] = useState<number>(0);
  const [valueAgeHight, setValueAgeHight] = useState<number>(20);
  const [gender, setGender] = useState<string>('');
  const {
    data,
    isLoading,
    getPets,
    error,
    dataType,
    getTypes,
    filterPet,
    dataFilter,
  } = useSearch();

  const searchResult = () => {
    var updateList = [...(dataFilter?.data ?? [])];
    updateList = updateList.filter(item => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.nameType.toLowerCase().includes(search.toLowerCase()) ||
        item.breed.toLowerCase().includes(search.toLowerCase())
      );
    });
    setPets(updateList);
  };

  const handleSelected = (id: number) => {
    setValue(id);
  };

  const filter = () => {
    var typePet: string = '';
    types.forEach(item => {
      if (item.id === value) {
        typePet = item.nameType;
      }
    });
    console.log(gender)
    filterPet('', typePet, valueAgeLow, valueAgeHight, gender);
    setOpenFilter(false);
  };

  useEffect(() => {
    getPets();
    filterPet('', '', valueAgeLow, valueAgeHight, gender);
    getTypes();
  }, []);

  useEffect(() => {
    setTypes([{id: 0, nameType: ''}, ...(dataType?.data ?? [])]);
  }, [dataType]);

  useEffect(() => {
    setPets(dataFilter?.data ?? []);
  }, [dataFilter]);

  return (
    <BaseScreen
      style={SearchStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SearchBar
            platform="android"
            containerStyle={{
              flex: 1,
              borderRadius: 8,
              borderWidth: 1,
              margin: 10,
              borderColor: Colors.silverSand,
              height: 46,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            value={search}
            onChangeText={value => setSearch(value)}
            placeholder="Search..."
            onSubmitEditing={() => searchResult()}
          />
          <TouchableOpacity onPress={() => setOpenFilter(true)}>
            <MaterialCommunityIcons
              name="filter-outline"
              size={35}
              style={{color: Colors.darker, marginEnd: 10}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            data={pets}
            scrollEnabled={false}
            style={{marginTop: 40}}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => (
              <ItemPet
                pet={item}
                onPress={() => navigation.navigate('DetailPet', {pet: item})}
              />
            )}
          />
        </ScrollView>
      </View>
      <Modal
        visible={openFilter}
        onDismiss={() => setOpenFilter(false)}
        onRequestClose={() => setOpenFilter(false)}
        animationType="slide"
        transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.lighter,
          }}>
          <View>
            <ToolbarHeader
              onPressLeft={() => setOpenFilter(false)}
              onPressRight={() => filter()}
              title="Filter"
              iconRight={Drawables.ic_check}
              iconLeft={Drawables.ic_left}
            />
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
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                marginStart: 20,
                marginTop: 20,
              }}>
              Gender:
            </Text>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <Select
                selectedValue={gender}
                onValueChange={value => setGender(value)}>
                <Select.Item value="" label="All" />
                <Select.Item value="true" label="Male" />
                <Select.Item value="false" label="Female" />
              </Select>
            </View>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                marginStart: 20,
                marginTop: 20,
              }}>
              Range Age:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 10,
              }}>
              <Text style={{flex: 1}}>{valueAgeLow}</Text>
              <Text>{valueAgeHight}</Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <MultiSlider
                min={0}
                max={20}
                step={1}
                values={[valueAgeLow, valueAgeHight]}
                onValuesChange={value => {
                  setValueAgeLow(value[0]);
                  setValueAgeHight(value[1]);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </BaseScreen>
  );
};

export default SearchScreen;
