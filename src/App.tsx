/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import HomeNavigation from './navigation/AppNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import RNBootSplash from 'react-native-bootsplash';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      RNBootSplash.hide();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
      <QueryClientProvider client={new QueryClient()}>
        <NativeBaseProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
  );
};

export default App;
