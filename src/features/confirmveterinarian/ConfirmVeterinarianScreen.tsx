import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {BaseScreen} from '../../components';
import {ConfirmVeterinarianStyles} from './ConfirmVeterinarian.Style';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ConfirmVeterinarianRootProp} from '../../navigation/props/index';
import {ConfirmVeterinarianRouteProp} from '../../navigation/route/index';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import ItemPet from '../pet/components/ItemPet';
import Button from '../../components/Button/Button';
import ItemVeterinarian from '../service/components/ItemVeterinarian';
import {useConfirm} from './hooks/useConfirm';

const ConfirmVeterinarianScreen = () => {
  const route = useRoute<ConfirmVeterinarianRouteProp>();

  const navigation = useNavigation<ConfirmVeterinarianRootProp>();
  const {isLoading, data, cancelBookingVeterinarian, error} = useConfirm();

  useEffect(() => {
    if (data?.status === 'Success') {
      Alert.alert('Cancel', 'Cancel booking successful!', [{text: 'Ok'}]);
      route.params.onRefresh();
      navigation.goBack();
    }
  }, [data]);

  return (
    <BaseScreen
      style={ConfirmVeterinarianStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="Booking Confirmed"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <View>
        <View
          style={{
            backgroundColor: Colors.romanticGreen,
            alignItems: 'center',
            marginHorizontal: 10,
            borderRadius: 5,
            paddingVertical: 3,
          }}>
          <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM}}>
            Your booking to hire{' '}
            {route.params.bookingVeterinarian.veterinarian.name} is booked!
          </Text>
        </View>
        <View style={{height: 200, marginTop: 40}}>
          <ItemVeterinarian
            veterinarian={route.params.bookingVeterinarian.veterinarian}
            onPress={() => {}}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.silver,
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 15,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 18,
              color: Colors.darker,
            }}>
            Contact us!
          </Text>

          <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, marginTop: 10}}>
            Contact: 0123456789
          </Text>
          <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, marginTop: 4}}>
            Email: noname@gmail.com
          </Text>
          <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, marginTop: 4}}>
            Location: BN BS QN
          </Text>
        </View>
        {route.params.bookingVeterinarian.status === 'WAITING' ? (
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 18,
              color: Colors.primary,
              marginTop: 20,
              marginLeft: 10,
            }}>
            Step 2: Confirmed!
          </Text>
        ) : null}
        {route.params.bookingVeterinarian.status === 'DONE' ||
        route.params.bookingVeterinarian.status === 'CANCEL' ? null : (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.silverSand,
                height: 1,
                marginRight: 4,
              }}
            />
            <Text style={{fontFamily: Fonts.ROBOTO_REGULAR}}>Pending</Text>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.silverSand,
                height: 1,
                marginLeft: 4,
              }}
            />
          </View>
        )}
        {route.params.bookingVeterinarian.status === 'WAITING' ? null : (
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 18,
              color: Colors.primary,
              marginTop: 20,
              marginLeft: 10,
            }}>
            Step 2:{' '}
            {route.params.bookingVeterinarian.status === 'DOING'
              ? 'Waiting for confirm'
              : 'Confirmed'}
          </Text>
        )}
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_MEDIUM,
            fontSize: 18,
            color: Colors.primary,
            marginTop: 20,
            marginLeft: 10,
          }}>
          Step 3: Veterinarian is coming
        </Text>
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_MEDIUM,
            fontSize: 18,
            color: Colors.primary,
            marginTop: 20,
            marginLeft: 10,
          }}>
          Step 4: Finish!
        </Text>
      </View>
      {route.params.edit !== true && (
        <Button
          style={{
            marginTop: 50,
            alignSelf: 'center',
            width: '70%',
            position: 'absolute',
            bottom: 20,
          }}
          title="Done"
          type="submit"
          onPress={() => {
            navigation.pop();
            navigation.pop();
            navigation.pop();
          }}
        />
      )}

      {route.params.edit && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 20,
            width: '90%',
            position: 'absolute',
            bottom: 10,
          }}>
          <Button
            title="Cancel"
            type="cancel"
            disabled={
              route.params.bookingVeterinarian.status === 'DONE' ||
              route.params.bookingVeterinarian.status === 'CANCEL'
            }
            style={{marginRight: 10, flex: 1}}
            onPress={() =>
              cancelBookingVeterinarian(route.params.bookingVeterinarian.id)
            }
          />
        </View>
      )}
    </BaseScreen>
  );
};

export default ConfirmVeterinarianScreen;
