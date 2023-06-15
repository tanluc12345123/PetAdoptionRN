import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Styles} from '../../theme/Styles';
import {Colors} from '../../theme';

type Props = {
  iconLeft?: number;
  onPressLeft(): void;
  title: string;
  isHome?: boolean;
  iconRight?: number;
  onPressRight(): void;
  style?: StyleProp<ViewStyle>;
};

const ToolbarHeader = ({
  iconLeft,
  onPressLeft,
  title,
  isHome,
  iconRight,
  onPressRight,
  style,
}: Props) => {
  return (
    <View style={[Styles.header, style]}>
      {iconLeft && (
        <TouchableOpacity style={Styles.headerIconLeft} onPress={onPressLeft}>
          <Image style={Styles.headerImageIcon} source={iconLeft} />
        </TouchableOpacity>
      )}
      <View>
        <Text
          style={{
            ...Styles.headerText,
            color: isHome ? Colors.primary : Colors.darker,
          }}>
          {title}
        </Text>
      </View>
      {iconRight && (
        <TouchableOpacity style={Styles.headerIconRight} onPress={onPressRight}>
          <Image style={Styles.headerImageIcon} source={iconRight} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ToolbarHeader;
