// app/components/Logo.tsx

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Logo: React.FC<{ logo: any; productionText: string }> = ({ logo, productionText }) => {
  return (
    <View style={styles.logoContainer}>
      <Image 
        source={logo} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.productionText}>{productionText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  productionText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 5,
    fontFamily: 'Creepster-Regular', // Utilisation de la police personnalisée
  },
});

export default Logo;
