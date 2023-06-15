import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {Service} from '../../../data/model/index';
import {HomeStyles} from '../Home.Style';
import {Fonts} from '../../../assets/fonts/index';
import {Colors} from '../../../theme';

type Props = {
  item?: Service;
  onPress(): void;
};

const ItemServiceHome = ({item, onPress}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', marginBottom: 20}}>
      <TouchableOpacity style={HomeStyles.containerItem} onPress={onPress}>
        <Image style={HomeStyles.imageItem} source={{uri: item?.image}} />
        <View style={HomeStyles.containerContent}>
          <View style={{flex: 1, flexDirection: 'column', marginStart: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.ROBOTO_BOLD,
                width: 200,
                color: Colors.darker,
              }}>
              {item?.name}
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.ROBOTO_REGULAR,
                width: 150,
                color: Colors.darker,
              }}
              numberOfLines={2}>
              {item?.description}
            </Text>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.ROBOTO_REGULAR,
                  color: Colors.electricRed,
                }}>
                {item?.price?.toLocaleString('en-US')}$
              </Text>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <TouchableOpacity
                  style={{alignItems: 'flex-end', marginRight: 10}}
                  onPress={onPress}>
                  <Text
                    style={{
                      fontFamily: Fonts.ROBOTO_BOLD,
                      color: Colors.primary,
                    }}>
                    SEE MORE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ItemServiceHome;
