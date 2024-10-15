// app/screens/CustomPersonnageScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomPersonnageScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Custom Personnage Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Creepster-Regular',
  },
});

export default CustomPersonnageScreen;
