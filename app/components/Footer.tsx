import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.versionText}>v0.1</Text>
      <Text style={styles.legalText}>
        Tous droits réservés. © {new Date().getFullYear()} Pandemania. 
        Ce jeu vidéo indépendant est protégé par la loi sur la propriété intellectuelle.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1D1D1D', // Couleur de fond sombre
  },
  versionText: {
    color: '#ffcc00', // Couleur de la version
    fontWeight: 'bold',
  },
  legalText: {
    color: '#fff', // Couleur des textes légaux
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
});

export default Footer;
