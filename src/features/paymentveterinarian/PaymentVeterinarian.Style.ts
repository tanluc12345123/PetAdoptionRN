import { Styles } from '../../theme';
import { StyleSheet } from "react-native";
import { Fonts } from '../../assets/fonts/index';
import { Colors } from '../../theme';

export const PaymentVeterinarianStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lighter
    },
    webViewCon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wbHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        zIndex: 25,
        elevation: 2,
    },
});
