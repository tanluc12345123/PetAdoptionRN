import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {TypePet} from '../../../data/model';
import {PetStyles} from '../Pet.Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import {Colors} from '../../../theme';

type Props = {
  type: TypePet;
  value: number;
  onPress(title?: number): void;
};

export const dataType = {
  Dog: 'dog',
  Cat: 'cat',
  Rabbit: 'rabbit',
  Bird: 'bird',
  Help: 'help',
};

const ItemTypePet = ({type, value, onPress}: Props) => {
  const [icon, setIcon] = useState<string>(dataType['Help']);
  const handleIcon = () => {
    Object.entries(dataType).forEach(entry => {
      const [key, value] = entry;
      if (key === type.nameType) {
        setIcon(value);
      }
    });
  };

  useEffect(() => {
    handleIcon();
  }, [value]);

  return (
    <TouchableOpacity
      onPress={() => onPress(type.id)}
      style={{
        ...PetStyles.containerTypePet,
        backgroundColor: value === type.id ? Colors.primary : Colors.lighter,
      }}>
      {type.nameType === '' ? (
        <Text
          style={{color: value === type.id ? Colors.lighter : Colors.darker}}>
          All
        </Text>
      ) : (
        <MaterialCommunityIcons
          name={icon}
          size={30}
          style={{color: value === type.id ? Colors.lighter : Colors.darker}}
        />
      )}
    </TouchableOpacity>
  );
};

export default ItemTypePet;
