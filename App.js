
import 'react-native-gesture-handler';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Navigator/Stack';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App=() => {
 
  return (
   <NavigationContainer>
<MyStack/>
   </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
