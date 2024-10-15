// app/(tabs)/_layout.tsx

import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import ConnexionScreen from '../screens/ConnexionScreen';
import Logo from '../components/Logo';
import BackgroundImage from '../components/BackgroundImage';

const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    'Creepster-Regular': require('../../assets/fonts/Creepster-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1D1D1D', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const logo = require('../../assets/images/corne.png');
  const backgroundImage = require('../../assets/images/dark-forest-background.jpg');

  return (
    <View style={{ flex: 1, backgroundColor: '#1D1D1D' }}>
      <BackgroundImage source={backgroundImage} />
      <Logo logo={logo} productionText="Production Pandemania" />
      
      {!isLoggedIn ? (
        <ConnexionScreen 
          onLogin={setIsLoggedIn} 
        />
      ) : (
        <Slot />
      )}
    </View>
  );
};

export default Layout;
