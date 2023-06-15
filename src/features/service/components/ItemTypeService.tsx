import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ServiceStyles} from '../Service.Style';
import {Colors} from '../../../theme';
import {Fonts} from '../../../assets/fonts/index';

type Props = {
  title: string;
  value: string;
  onPress(title?: string): void;
};

const ItemTypeService = ({title, value, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(title)}
      style={{
        ...ServiceStyles.containerTypeService,
        backgroundColor: value === title ? Colors.primary : Colors.lighter,
      }}>
      <Text
        style={{
          fontFamily: Fonts.ROBOTO_BOLD,
          color: value === title ? Colors.lighter : Colors.primary,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemTypeService;
