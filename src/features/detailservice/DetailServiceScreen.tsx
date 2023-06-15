import {View, Text, Image} from 'react-native';
import React from 'react';
import {DetailServiceStyles} from './DetailService.Style';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {DetailServiceRouteProp} from '../../navigation/route/index';
import {DetailServiceRootProps} from '../../navigation/props/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'native-base';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import Button from '../../components/Button/Button';
import {useDetail} from './hooks/useDetail';
import {useEffect} from 'react';

const DetailServiceScreen = () => {
  const route = useRoute<DetailServiceRouteProp>();
  const navigation = useNavigation<DetailServiceRootProps>();
  const service = route.params?.service;
  const {isLoading, getServices, data, error} = useDetail();

  useEffect(() => {
    getServices();
    console.log(service.name);
  }, []);

  useEffect(() => {}, [data]);

  return (
    <BaseScreen
      style={DetailServiceStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.pop()}
          onPressRight={() => {}}
          title="Service Details"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <ScrollView>
        <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
          {service?.image && service?.image !== 'string' ? (
            <Image
              source={{uri: service?.image}}
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
            {service?.name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_BOLD,
              fontSize: 20,
              color: Colors.electricRed,
              marginTop: 10,
            }}>
            {service?.price?.toLocaleString('en-US')}$
          </Text>
          <Text
            style={{
              fontFamily: Fonts.ROBOTO_MEDIUM,
              fontSize: 15,
              color: Colors.darker,
              marginTop: 10,
            }}>
            {service?.typeService === 'SERVICE_BY_DAY'
              ? 'Service by day'
              : 'Service by time'}
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
            {service?.description}
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
          title="Book Service"
          style={{width: '90%'}}
          onPress={() => {
            if (route.params.service.name === 'Dịch vụ mượn thú cưng') {
              route.params.onHire();
            } else {
              navigation.navigate('BookService', {
                service: route.params.service,
              });
            }
          }}
        />
      </View>
    </BaseScreen>
  );
};

export default DetailServiceScreen;
