// app/(tabs)/startGame.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const StartGameScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start Game Screen</Text>
      {/* Ajoutez ici les composants spécifiques à votre écran Start Game */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Creepster-Regular',
  },
});

export default StartGameScreen;
