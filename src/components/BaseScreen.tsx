import { ActivityIndicator, Alert, StyleProp, ViewStyle } from "react-native";
import { Styles } from "../theme";
import { ErrorResponse } from "../data/model";
import React, { useEffect } from "react";
import { Box } from "native-base";

type Props = {
  isLoading?: boolean;
  error?: ErrorResponse | null;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const BaseScreen = (props: Props) => {
  useEffect(() => {
    if (props?.error) {
      Alert.alert("Lỗi", props.error.message, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }, [props?.error]);

  return (
    <Box style={[props.style]}>
      {props.children}
      {props.isLoading && (
        <ActivityIndicator style={Styles.loading} size="large" />
      )}
    </Box>
  );
};
