// app/components/AnimatedTitle.tsx

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import Easing from 'react-native/Libraries/Animated/Easing';

const AnimatedTitle: React.FC<{ title: string }> = ({ title }) => {
  const titleAnimation = useRef(new Animated.Value(0)).current;

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

  return (
    <Animated.Text style={[styles.title, animatedTitleStyle]}>
      {title}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 192, // Taille de police augmentée (3x 64)
    color: '#ffcc00',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Creepster-Regular',
  },
});

export default AnimatedTitle;
