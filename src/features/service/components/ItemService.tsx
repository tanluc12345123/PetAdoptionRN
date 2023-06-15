import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../../theme';
import {Fonts} from '../../../assets/fonts/index';
import {Service} from '../../../data/model/index';
import {ServiceStyles} from '../Service.Style';

type Props = {
  service?: Service;
  onPress(): void;
};

const ItemService = ({service, onPress}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', width: '100%'}}>
      <TouchableOpacity
        style={ServiceStyles.containerItemService}
        onPress={onPress}>
        <Image style={ServiceStyles.imageItem} source={{uri: service?.image}} />
        <View style={ServiceStyles.containerContent}>
          <View style={{flex: 1, flexDirection: 'column', marginStart: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.ROBOTO_BOLD,
                color: Colors.darker,
              }}>
              {service?.name}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                color: Colors.electricRed,
              }}>
              {service?.price?.toLocaleString('en-US')}$
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                color: Colors.darker,
              }}
              numberOfLines={2}>
              {service?.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemService;
