// app/(tabs)/home.tsx

import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Easing from 'react-native/Libraries/Animated/Easing';
import BackgroundImage from '../components/BackgroundImage';
import Logo from '../components/Logo';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const logo = require('../../assets/images/corne.png'); // Chemin du logo
  const backgroundImage = require('../../assets/images/dark-forest-background.jpg'); // Chemin de l'image de fond
  const productionText = "Production Pandemania";

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(titleAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(titleAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [titleAnimation]);

  const animatedTitleStyle = {
    opacity: titleAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
    }),
    transform: [
      {
        translateY: titleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 10],
        }),
      },
      {
        scale: titleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.05],
        }),
      },
    ],
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const animatedButtonStyle = {
    transform: [{ scale: buttonScale }],
  };

  return (
    <View style={styles.container}>
      {/* Utilisation du composant BackgroundImage */}
      <BackgroundImage backgroundImage={backgroundImage} />
      
      {/* Utilisation du composant Logo */}
      <Logo logo={logo} productionText={productionText} />

      {/* Contenu principal */}
      <View style={styles.content}>
        {/* Titre animé */}
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          Loup Garou
        </Animated.Text>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          {/* Start Game */}
          <Animated.View style={[styles.buttonWrapper, animatedButtonStyle]}>
            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
              onPress={() => router.push('/startGame')}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Custom Personnage */}
          <Animated.View style={[styles.buttonWrapper, animatedButtonStyle]}>
            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
              onPress={() => router.push('/customPersonnage')}
            >
              <Text style={styles.buttonText}>Custom Personnage</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Options */}
          <Animated.View style={[styles.buttonWrapper, animatedButtonStyle]}>
            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
              onPress={() => router.push('/options')}
            >
              <Text style={styles.buttonText}>Options</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Quitter */}
          <Animated.View style={[styles.buttonWrapper, animatedButtonStyle]}>
            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
              onPress={() => { /* Logique pour quitter l'application */ }}
            >
              <Text style={styles.buttonText}>Quitter</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D', // Couleur de fond sombre
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 64,
    color: '#ffcc00',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Creepster-Regular', // Utilisation de la police personnalisée
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '30%', // 30% de la largeur de l'écran
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 69, 0, 0.8)', // Nuance de couleur orange/rouge sang
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000', // Contours noirs
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, // Pour Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Creepster-Regular', // Utilisation de la police personnalisée
  },
});

export default HomeScreen;
