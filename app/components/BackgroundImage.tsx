// app/components/BackgroundImage.tsx

import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const BackgroundImage: React.FC<{ source: any }> = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={source} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default BackgroundImage;
