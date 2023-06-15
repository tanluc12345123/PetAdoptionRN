import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../../theme';
import {Fonts} from '../../../assets/fonts/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onPress(): void;
  title: string;
  body: string;
};

const ItemProfile = ({onPress, title, body}: Props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.silver,
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'column', width: '45%'}}>
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_BOLD,
            color: Colors.darker,
            fontSize: 15,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_REGULAR,
            marginTop: 10,
            color: Colors.darker,
          }}>
          {body}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row-reverse',
          alignSelf: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={onPress}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          style={{color: Colors.blueDeFrance}}
        />
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_REGULAR,
            fontSize: 15,
            color: Colors.blueDeFrance,
          }}>
          Click Here
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemProfile;
