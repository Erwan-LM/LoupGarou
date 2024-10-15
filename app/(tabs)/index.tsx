// app/(tabs)/index.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const Tabs: React.FC = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Tabs;
