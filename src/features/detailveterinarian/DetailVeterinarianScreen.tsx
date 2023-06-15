import {View, Text, Image} from 'react-native';
import React from 'react';
import {DetailVeterinarianStyles} from './DetailVeterinarian.Style';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {DetailVeterinarianRouteProp} from '../../navigation/route/index';
import {DetailVeterinarianRootProps} from '../../navigation/props/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import Button from '../../components/Button/Button';

const DetailVeterinarianScreen = () => {
  const route = useRoute<DetailVeterinarianRouteProp>();
  const navigation = useNavigation<DetailVeterinarianRootProps>();
  const veterinarian = route.params?.veterinarian;
  return (
    <BaseScreen style={DetailVeterinarianStyles.container}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.pop()}
          onPressRight={() => {}}
          title="Veterinarian Details"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
          {veterinarian?.image ? (
            <Image
              source={{uri: veterinarian?.image}}
              style={{width: '100%', height: 300, borderRadius: 20}}
            />
          ) : (
            <Image
              source={Drawables.ic_image}
              style={{width: '100%', height: 300, borderRadius: 20}}
            />
          )}
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
              marginTop: 20,
            }}>
            {veterinarian?.name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.electricRed,
              marginTop: 10,
            }}>
            {veterinarian?.price?.toLocaleString('en-US')}$/day
          </Text>

          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 15,
              marginTop: 10,
              color: Colors.darker,
            }}>
            Phone number: {veterinarian?.phoneNumber}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 15,
              color: Colors.darker,
            }}>
            Address: {veterinarian?.address}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
              marginTop: 15,
            }}>
            Description:
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_REGULAR,
              color: Colors.darker,
              fontSize: 15,
            }}>
            {veterinarian?.description}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Button
          title="Book Veterinarian"
          style={{width: '90%'}}
          onPress={() =>
            navigation.navigate('BookVeterinarian', {
              veterinarian: veterinarian,
            })
          }
        />
      </View>
    </BaseScreen>
  );
};

export default DetailVeterinarianScreen;
