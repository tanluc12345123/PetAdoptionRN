import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Pet} from '../../../data/model';
import {PetStyles} from '../Pet.Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../theme';
import {Fonts} from '../../../assets/fonts/index';

type Props = {
  pet?: Pet;
  onPress(): void;
};

const ItemPet = ({pet, onPress}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', width: '100%'}}>
      <TouchableOpacity style={PetStyles.containerItemPet} onPress={onPress}>
        <Image
          style={PetStyles.imageItem}
          source={{uri: pet?.petImage?.image1}}
        />
        <View style={PetStyles.containerContent}>
          <View style={{flexDirection: 'column'}}>
            <View style={PetStyles.gender}>
              <MaterialCommunityIcons
                name={pet?.gender ? 'gender-male' : 'gender-female'}
                size={17}
                style={{
                  marginEnd: 10,
                  color: pet?.gender ? Colors.blueDeFrance : Colors.pink,
                  fontFamily: Fonts.ROBOTO_REGULAR,
                }}
              />
              <Text style={{color: Colors.darker}}>
                {pet?.gender ? 'Male' : 'Female'}
              </Text>
            </View>
            <Text style={PetStyles.age}>
              {pet?.age ? pet.age + ' years' : null}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column', marginStart: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.ROBOTO_BOLD,
                color: Colors.darker,
              }}>
              {pet?.name}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                color: Colors.darker,
              }}>
              {pet?.breed}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                color: Colors.electricRed,
              }}>
              {pet?.price ? pet?.price?.toLocaleString('en-US') + '$' : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemPet;
