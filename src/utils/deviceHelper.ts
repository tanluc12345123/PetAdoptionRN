import { Dimensions, Platform } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const isIos = Platform.OS === "ios";

export { deviceWidth, deviceHeight, isIos };
