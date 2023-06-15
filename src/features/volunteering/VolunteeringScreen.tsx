import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useVolunteering} from './hooks/useVolunteering';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {VolunteeringStyles} from './Volunteering.Style';
import {Drawables} from '../../assets/images/index';
import {ScrollView} from 'native-base';
import {Volunteering} from '../../data/model/index';
import {useEffect} from 'react';
import ItemVolunteeringActivity from './components/ItemVolunteeringActivity';
import {useNavigation} from '@react-navigation/native';
import {RootProps} from '../../navigation/props/index';

const VolunteeringScreen = () => {
  const navigation = useNavigation<RootProps>();
  const [volunteeringActivities, setVolunteeringActivities] = useState<
    Volunteering[]
  >([]);
  const {isLoading, getVolunteeringActivities, data, error} = useVolunteering();

  useEffect(() => {
    getVolunteeringActivities();
  }, []);

  useEffect(() => {
    setVolunteeringActivities(data?.data || []);
  }, [data]);
  return (
    <BaseScreen
      style={VolunteeringStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <View style={{marginTop: 10}}>
          <ToolbarHeader
            onPressLeft={() => {}}
            onPressRight={() => {}}
            title="Volunteer Activities"
            iconRight={Drawables.ic_notification}
          />
        </View>
        <ScrollView>
          <View style={{marginBottom: 10, marginTop: 10}}>
            <FlatList
              data={volunteeringActivities}
              style={{marginBottom: 60}}
              renderItem={({item}) => (
                <ItemVolunteeringActivity
                  volunteering={item}
                  onPress={() =>
                    navigation.navigate('DetailVolunteering', {
                      volunteering: item,
                    })
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default VolunteeringScreen;
