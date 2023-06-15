import {View, Text, Animated, Easing} from 'react-native';
import React from 'react';
import {Styles} from '../../theme/Styles';
import {Colors} from '../../theme';
import {useEffect} from 'react';

type Props = {
  focused: Boolean;
  label: string;
  icon: React.ReactNode;
};

const IconButtonTab = ({focused, label, icon}: Props) => {
  const animatedValue = new Animated.Value(0);

  const scaleText = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
  const scale = {transform: [{scale: scaleText}]};

  const createAnimation = () => {
    return Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  animatedValue.setValue(focused ? 0 : 1);
  if (focused) {
    createAnimation();
  }

  return (
    <Animated.View
      style={{
        ...Styles.containerIconBottom,
        ...scale,
        backgroundColor: focused ? Colors.primary : undefined,
      }}>
      {icon}
      {focused && (
        <Text
          numberOfLines={1}
          style={{fontSize: 10, color: focused ? 'white' : Colors.silverSand}}>
          {label}
        </Text>
      )}
    </Animated.View>
  );
};

export default IconButtonTab;
