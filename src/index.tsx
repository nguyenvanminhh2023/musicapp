import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { Provider } from 'src/provider';
import { Screens } from 'src/screens';

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Screens />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
