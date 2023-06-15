import {View, Text, StyleProp, ViewStyle, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../theme';
import {Fonts} from '../../assets/fonts/index';
import IconCheck from '../../assets/images/ic_check.svg';
import IconError from '../../assets/images/ic_error.svg';
import IconEye from '../../assets/images/ic_eye.svg';
import IconCloseEye from '../../assets/images/ic_close_eye.svg';

type Props = {
  title: string;
  value?: string;
  none?: boolean;
  onChange(value: string): void;
  style?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  isShowPassword?: boolean;
  onPressShowPassword(isShowPassword: boolean): void | undefined;
};

const InputText = ({
  title,
  value,
  onChange,
  style,
  isPassword,
  isShowPassword,
  none,
  onPressShowPassword,
}: Props) => {
  const [state, setState] = useState<StyleProp<ViewStyle>>({});
  const onBlur = () => {
    setState({
      backgroundColor: Colors.lighter,
      borderColor: Colors.silverSand,
    });
  };

  const onFocus = () => {
    setState({
      backgroundColor: Colors.platinum,
      borderColor: Colors.primary,
    });
  };

  const isPhone = (str: string) => {
    if (typeof str != 'string') {
      return false;
    }
    return !isNaN(parseFloat(str)) && str.length >= 10;
  };

  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: Fonts.ROBOTO_MEDIUM,
          marginLeft: 20,
          marginBottom: 4,
        }}>
        {title}
      </Text>
      <View>
        <TextInput
          value={value}
          onChangeText={text => onChange(text)}
          style={[
            {
              borderWidth: 1,
              height: 40,
              borderRadius: 6,
              paddingHorizontal: 12,
              borderColor: Colors.silverSand,
            },
            state,
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={isPassword && !isShowPassword}
        />
        {isPassword ? (
          isShowPassword ? (
            <IconEye
              width={20}
              height={30}
              onPress={() => onPressShowPassword(!isShowPassword)}
              style={{position: 'absolute', right: 25, bottom: 6}}
            />
          ) : (
            <IconCloseEye
              width={20}
              height={30}
              onPress={() => onPressShowPassword(!isShowPassword)}
              style={{position: 'absolute', right: 25, bottom: 6}}
            />
          )
        ) : undefined}
        {value && none &&
          !isPassword &&
          (isPhone(value) ? (
            <IconCheck
              width={20}
              height={30}
              style={{position: 'absolute', right: 25, bottom: 6}}
            />
          ) : (
            <IconError
              width={20}
              height={30}
              style={{position: 'absolute', right: 25, bottom: 6}}
            />
          ))}
      </View>
    </View>
  );
};

export default InputText;
