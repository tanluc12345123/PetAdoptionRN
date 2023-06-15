import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Volunteering} from '../../../data/model/index';
import {VolunteeringStyles} from '../Volunteering.Style';
import {Image} from 'react-native';
import {Fonts} from '../../../assets/fonts/index';
import {Colors} from '../../../theme';

type Props = {
  volunteering: Volunteering;
  onPress(): void;
};

const ItemVolunteeringActivity = ({volunteering, onPress}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', width: '100%'}}>
      <TouchableOpacity
        style={VolunteeringStyles.containerItem}
        onPress={onPress}>
        <Image
          style={VolunteeringStyles.imageItem}
          source={{uri: volunteering?.image}}
        />
        <View style={VolunteeringStyles.containerContent}>
          <View style={{flexDirection: 'column'}}>
            <View style={VolunteeringStyles.numberPeople}>
              <Text
                style={{
                  color: Colors.darker,
                  fontFamily: Fonts.ROBOTO_REGULAR,
                  fontSize: 12,
                }}>
                {volunteering.numberPeople} Peoples
              </Text>
            </View>
            <Text style={VolunteeringStyles.dateOfEvent}>
              {volunteering?.dateOfEvent}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column', marginStart: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.ROBOTO_BOLD,
                color: Colors.darker,
              }}
              numberOfLines={2}>
              {volunteering?.name}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                color: Colors.darker,
              }}
              numberOfLines={2}>
              {volunteering?.requirement}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemVolunteeringActivity;
