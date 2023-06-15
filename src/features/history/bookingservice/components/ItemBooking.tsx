import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../../../theme';
import {BookingServiceHistoryStyles} from '../BookingServiceHistory.Style';
import {Drawables} from '../../../../assets/images/index';
import {BookService} from '../../../../data/model/index';
import {Fonts} from '../../../../assets/fonts/index';
import Moment from 'moment';

type Props = {
  book?: BookService;
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
          style={BookingServiceHistoryStyles.imageItem}
          source={{uri: book?.service.image}}
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
              You have a {book?.service.name} with {book?.pet.name} on{' '}
              {book?.visitingTimeStart}{' '}
              {Moment(book?.dateStart).format('DD/MM/yyyy')}
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
                backgroundColor: book?.payment
                  ? Colors.romanticGreen
                  : Colors.yelpRed,
                borderRadius: 10,
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_ITALIC,
                  color: Colors.lighter,
                }}>
                {book?.payment ? 'Paid' : 'Non Paid'}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 15,
                backgroundColor:
                  book?.status === 'DOING'
                    ? Colors.yellowIris
                    : book?.status === 'WAITING'
                    ? Colors.romanticGreen
                    : book?.status === 'CANCEL'
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
                {book?.status === 'DOING'
                  ? 'Waiting'
                  : book?.status === 'WAITING'
                  ? 'Approve'
                  : book?.status === 'CANCEL'
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
