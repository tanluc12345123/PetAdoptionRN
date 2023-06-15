import {View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen';
import {HistoryStyles} from './History.Style';
import {TabView, SceneMap} from 'react-native-tab-view';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {HistoryRootProp} from '../../navigation/props';
import {Colors} from '../../theme';
import BookingServiceHistoryScreen from './bookingservice/BookingServiceHistoryScreen';
import BookingVeterinarianHistoryScreen from './bookingveterinarian/BookingVeterinarianHistoryScreen';
import RegisteredVolunteeringHistoryScreen from './registeredvolunteering/RegisteredVolunteeringHistoryScreen';

const renderScene = SceneMap({
  first: BookingServiceHistoryScreen,
  second: BookingVeterinarianHistoryScreen,
  third: RegisteredVolunteeringHistoryScreen,
});

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryRootProp>();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Book Service'},
    {key: 'second', title: 'Book Veterinarian'},
    {key: 'third', title: 'Registered Volunteering'},
  ]);

  return (
    <BaseScreen style={HistoryStyles.container}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="History Booking"
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

export default HistoryScreen;
