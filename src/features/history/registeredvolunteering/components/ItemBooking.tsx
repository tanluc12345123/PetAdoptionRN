import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../../theme';
import {RegisteredVolunteeringHistoryStyles} from '../RegisteredVolunteeringHistory.Style';
import {BookVolunteering} from '../../../../data/model/index';
import {Fonts} from '../../../../assets/fonts/index';

type Props = {
  book?: BookVolunteering;
  onPress(): void;
};

const ItemBooking = ({book, onPress}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', marginBottom: 30}}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.silver,
          borderRadius: 10,
          marginHorizontal: 20,
          flexDirection: 'row',
        }}
        onPress={onPress}>
        <Image
          style={RegisteredVolunteeringHistoryStyles.imageItem}
          source={{uri: book?.volunteer.image}}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 20,
            marginStart: 20,
          }}>
          <View style={{flexDirection: 'row', marginEnd: 10}}>
            <Text
              style={{fontFamily: Fonts.ROBOTO_REGULAR, color: Colors.darker}}>
              You have a volunteering activity {book?.volunteer.name} on{' '}
              {book?.volunteer.dateOfEvent}
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 15,
                backgroundColor:
                  book?.complete === 'DOING' || book?.complete === 'WAITING'
                    ? Colors.yellowIris
                    : book?.complete === 'CANCEL' ||
                      book?.volunteer.status === 'CANCEL'
                    ? Colors.yelpRed
                    : Colors.seaGreen,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_ITALIC,
                  color: Colors.lighter,
                }}>
                {book?.complete === 'DOING' || book?.complete === 'WAITING'
                  ? 'Happening'
                  : book?.complete === 'CANCEL' ||
                    book?.volunteer.status === 'CANCEL'
                  ? 'Cancel'
                  : 'Done'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemBooking;
