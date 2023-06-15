import {View, Text, Image} from 'react-native';
import React from 'react';
import {DetailVolunteeringStyles} from './DetailVolunteering.Style';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {DetailVolunteeringRouteProp} from '../../navigation/route/index';
import {DetailVolunteeringRootProps} from '../../navigation/props/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import Button from '../../components/Button/Button';

const DetailVolunteeringScreen = () => {
  const route = useRoute<DetailVolunteeringRouteProp>();
  const navigation = useNavigation<DetailVolunteeringRootProps>();
  const volunteering = route.params?.volunteering;
  return (
    <BaseScreen style={DetailVolunteeringStyles.container}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.pop()}
          onPressRight={() => {}}
          title="Activity Details"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
          {volunteering?.image ? (
            <Image
              source={{uri: volunteering?.image}}
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
            {volunteering?.name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                color: Colors.darker,
              }}>
              Quantity needed people:
            </Text>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                marginLeft: 5,
                color: Colors.electricRed,
              }}>
              {volunteering?.numberPeople}
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                color: Colors.darker,
              }}>
              Date of event:
            </Text>
            <Text
              style={{
                fontFamily: Fonts.ROBOTO_MEDIUM,
                fontSize: 15,
                marginLeft: 5,
                color: Colors.electricRed,
              }}>
              {volunteering?.dateOfEvent}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.darker,
              marginTop: 15,
            }}>
            Requirement:
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_REGULAR,
              color: Colors.darker,
              fontSize: 15,
            }}>
            {volunteering?.requirement}
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
            {volunteering?.description}
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
          title="Register"
          style={{width: '90%'}}
          onPress={() =>
            navigation.navigate('BookVolunteering', {
              volunteering: volunteering,
            })
          }
        />
      </View>
    </BaseScreen>
  );
};

export default DetailVolunteeringScreen;
