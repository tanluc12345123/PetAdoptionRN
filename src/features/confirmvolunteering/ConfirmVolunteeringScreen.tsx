import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BaseScreen} from '../../components';
import {ConfirmVolunteeringStyles} from './ConfirmVolunteering.Style';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ConfirmVolunteeringRootProp} from '../../navigation/props/index';
import {ConfirmVolunteeringRouteProp} from '../../navigation/route/index';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import Button from '../../components/Button/Button';
import ItemVolunteeringActivity from '../volunteering/components/ItemVolunteeringActivity';
import {useConfirm} from './hooks/useConfirm';
import {FormControl, Modal, TextArea} from 'native-base';

const ConfirmVolunteeringScreen = () => {
  const route = useRoute<ConfirmVolunteeringRouteProp>();

  const navigation = useNavigation<ConfirmVolunteeringRootProp>();
  const {isLoading, data, cancelBookingVolunteering, error} = useConfirm();
  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (data?.status === 'Success') {
      Alert.alert('Cancel', 'Cancel booking successful!', [{text: 'Ok'}]);
      route.params.onRefresh();
      navigation.goBack();
    }
  }, [data]);

  return (
    <BaseScreen
      style={ConfirmVolunteeringStyles.container}
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
            Your registered volunteering activity:{' '}
            {route.params.booking.volunteer.name} is registered!
          </Text>
        </View>
        <View style={{height: 200, marginTop: 40}}>
          <ItemVolunteeringActivity
            volunteering={route.params.booking.volunteer}
            onPress={() =>
              navigation.navigate('DetailVolunteering', {
                volunteering: route.params.booking.volunteer,
              })
            }
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
        {route.params.booking.complete === 'DONE' ? null : (
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

        <Text
          style={{
            fontFamily: Fonts.ROBOTO_MEDIUM,
            fontSize: 18,
            color: Colors.primary,
            marginTop: 20,
            marginLeft: 10,
          }}>
          Step 2: Go to Volunteering Activity
        </Text>
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_MEDIUM,
            fontSize: 18,
            color: Colors.primary,
            marginTop: 20,
            marginLeft: 10,
          }}>
          Step 3: Finish!
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
              route.params.booking.complete === 'DONE' ||
              route.params.booking.complete === 'CANCEL' ||
              route.params.booking.volunteer.status === 'CANCEL'
            }
            style={{marginRight: 10, flex: 1}}
            onPress={() => setOpen(true)}
          />
        </View>
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Reason</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Reason</FormControl.Label>
              <TextArea
                h={20}
                w="75%"
                maxW="300"
                autoCompleteType={undefined}
                value={reason}
                onChangeText={e => setReason(e)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              title="Cancel"
              type="cancel"
              onPress={() => {
                setOpen(false);
              }}
            />
            <Button
              title="Submit"
              type="submit"
              onPress={() =>
                cancelBookingVolunteering(route.params.booking.id, reason)
              }
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </BaseScreen>
  );
};

export default ConfirmVolunteeringScreen;
