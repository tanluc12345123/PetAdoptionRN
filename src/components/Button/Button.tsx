import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../theme';
import {Fonts} from '../../assets/fonts/index';

type Props = {
  title: string;
  disabled?: boolean;
  type?: string;
  style?: StyleProp<ViewStyle>;
  onPress(): void;
};

const Button = ({title, disabled, type, style, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: '40%',
          backgroundColor: disabled
            ? Colors.silverSand
            : type === 'submit'
            ? Colors.seaGreen
            : type === 'normal'
            ? Colors.primary
            : Colors.lighter,
          paddingVertical: 8,
          borderRadius: 100,
          flexDirection: 'column',
          alignItems: 'center',
          elevation: 10,
          borderColor: disabled
            ? Colors.silverSand
            : type === 'submit' || type === 'normal'
            ? undefined
            : type === 'cancel'
            ? Colors.electricRed
            : Colors.primary,
          borderWidth: type === 'submit' || type === 'normal' ? 0 : 1,
        },
        style,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{
          fontFamily: Fonts.ROBOTO_MEDIUM,
          color:
            type === 'submit' || type === 'normal'
              ? Colors.lighter
              : type === 'cancel'
              ? Colors.electricRed
              : Colors.primary,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
