import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Veterinarian} from '../../../data/model/index';
import {ServiceStyles} from '../Service.Style';
import {Fonts} from '../../../assets/fonts/index';
import {Colors} from '../../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  veterinarian?: Veterinarian;
  onPress(): void;
};

const ItemVeterinarian = ({veterinarian, onPress}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', width: '100%'}}>
      <TouchableOpacity
        style={ServiceStyles.containerItemService}
        onPress={onPress}>
        <Image
          style={ServiceStyles.imageItem}
          source={{uri: veterinarian?.image}}
        />
        <View style={ServiceStyles.containerContent}>
          <View style={{flex: 1, flexDirection: 'column', marginStart: 10}}>
            <Text style={{fontSize: 20, fontFamily: Fonts.ROBOTO_BOLD}}>
              {veterinarian?.name}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                color: Colors.electricRed,
              }}>
              {veterinarian?.price?.toLocaleString('en-US')}$
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="phone" size={15} />
              <Text style={{fontFamily: Fonts.ROBOTO_REGULAR, marginLeft: 2}}>
                {veterinarian?.phoneNumber}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="map-marker" size={15} />
              <Text style={{fontFamily: Fonts.ROBOTO_REGULAR, marginLeft: 2}}>
                {veterinarian?.address}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemVeterinarian;
