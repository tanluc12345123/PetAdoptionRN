/**
 * @format
 */

import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from './src/libs/redux/store/configureStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const AppDefault = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <App />
            </GestureHandlerRootView>
        </Provider>

    );
};

AppRegistry.registerComponent(appName, () => AppDefault);
