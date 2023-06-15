import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../../../theme';

type Props = {
  title: string | undefined;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ItemDetail = ({title, children, style}: Props) => {
  return (
    <View style={[{width: 80, marginTop: 10}, style]}>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.silverSand,
          width:60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf:'center',
          padding: 10,
        }}>
        {children}
      </View>
      <Text style={{marginTop: 5, alignSelf: 'center'}}>{title}</Text>
    </View>
  );
};

export default ItemDetail;
