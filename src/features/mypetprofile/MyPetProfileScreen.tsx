import {View, Text, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import {MyPetProfileStyles} from './MyPetProfile.Style';
import {TabView, SceneMap} from 'react-native-tab-view';
import MyPetScreen from './mypet/MyPetScreen';
import PetAdoptionScreen from './petadoption/PetAdoptionScreen';
import BookingAppointmentHistoryScreen from './bookingappointmenthistory/BookingAppointmentHistoryScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {MyPetProfileRootProp} from '../../navigation/props';
import {Colors} from '../../theme';

const renderScene = SceneMap({
  first: MyPetScreen,
  second: PetAdoptionScreen,
  third: BookingAppointmentHistoryScreen,
});

const MyPetProfileScreen = () => {
  const navigation = useNavigation<MyPetProfileRootProp>();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'My Pet'},
    {key: 'second', title: 'Pet Adoption'},
    {key: 'third', title: 'Appointment'},
  ]);
  return (
    <BaseScreen style={MyPetProfileStyles.container}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="My Pets"
          iconLeft={Drawables.ic_left}
        />
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        pagerStyle={{backgroundColor: Colors.lighter, padding: 100}}
      />
    </BaseScreen>
  );
};

export default MyPetProfileScreen;
