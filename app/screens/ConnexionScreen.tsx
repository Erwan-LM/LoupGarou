import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../components/BackgroundImage';
import Logo from '../components/Logo';
import AnimatedTitle from '../components/AnimatedTitle';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const passwordRequirements = {
  minLength: 8,
  uppercase: /[A-Z]/,
  number: /\d/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

const ConnexionScreen: React.FC = () => {
  const router = useRouter();
  const logo = require('../../assets/images/corne.png');
  const backgroundImage = require('../../assets/images/dark-forest-background.jpg');
  const productionText = "Production Pandemania";

  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = () => {
    if (username === "" || password === "") {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 7000);
    } else {
      router.push('/home');
    }
  };

  const handleSignup = () => {
    if (!username || !password || !confirmPassword || !email) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatchError(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 7000);
      return;
    }

    if (passwordError) {
      Alert.alert("Erreur", "Le mot de passe ne répond pas aux exigences.");
      return;
    }

    setShowConfirmation(true);
  };

  const validateEmail = (input: string) => {
    // Expression régulière simple pour valider un format d'e-mail
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(input); // Renvoie true si l'e-mail est valide
  };
  

  const handleConfirmation = (isConfirmed: boolean) => {
    setShowConfirmation(false);
    if (isConfirmed) {
      Alert.alert('Inscription réussie', 'Un email de confirmation a été envoyé.');
      resetFields();
    }
  };

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setIsSignup(false);
  };

  const validatePassword = (input: string) => {
    const isValid = input.length >= passwordRequirements.minLength &&
      passwordRequirements.uppercase.test(input) &&
      passwordRequirements.number.test(input) &&
      passwordRequirements.special.test(input);
    
    setPasswordError(!isValid);
  };

  useEffect(() => {
    if (isSignup && password !== confirmPassword) {
      setPasswordsMatchError(true);
    } else {
      setPasswordsMatchError(false);
    }
  }, [password, confirmPassword, isSignup]);

  useEffect(() => {
    if (password) {
      validatePassword(password);
    }
  }, [password]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <BackgroundImage source={backgroundImage} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.5)', 'transparent', 'rgba(0, 0, 0, 0.5)']}
          style={styles.gradient}
        />
      </View>

      <Logo logo={logo} productionText={productionText} />

      <View style={styles.formContainer}>
        <AnimatedTitle title="Loup Garou" />

        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setShowPasswordInfo(!!text);
          }}
        />

        {showPasswordInfo && (
          <View style={styles.passwordInfo}>
            <Text style={styles.passwordInfoText}>
              Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un symbole.
            </Text>
            {passwordError && <Text style={styles.errorText}>Conditions non remplies</Text>}
          </View>
        )}

        {isSignup && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError && (
              <View style={styles.popup}>
                <Text style={styles.popupText}>E-mail incorrect ou inexistant. Veuillez réessayer.</Text>
                <TouchableOpacity onPress={() => setEmailError(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            )}
            {passwordsMatchError && (
              <Text style={styles.errorText}>Les mots de passe ne correspondent pas.</Text>
            )}
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={isSignup ? handleSignup : handleLogin}>
          <Text style={styles.buttonText}>{isSignup ? "S'inscrire" : "Se connecter"}</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={['#ffcc00', 'rgba(255, 69, 0, 0.8)']}
          style={styles.signupButton}
        >
          <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
            <Text style={styles.signupButtonText}>
              {isSignup ? "Déjà inscrit ? Se connecter" : "Pas encore inscrit ? S'inscrire"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {showConfirmation && (
          <View style={styles.popup}>
            <Text style={styles.popupText}>Confirmez-vous votre inscription ?</Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity onPress={() => handleConfirmation(false)} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Non</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleConfirmation(true)} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {loginError && (
          <View style={styles.popup}>
            <Text style={styles.popupText}>Erreur de login et/ou mot de passe, veuillez recommencer.</Text>
            <TouchableOpacity onPress={() => setLoginError(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  input: {
    height: 50,
    width: width * 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  passwordInfo: {
    marginBottom: 10,
  },
  passwordInfoText: {
    color: 'white',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: width * 0.8,
    alignItems: 'center',  // Centrer le texte dans le bouton
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  signupButton: {
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: 'center',  // Centrer le texte dans le bouton
  },
  signupButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  popup: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    width: width * 0.8,
    zIndex: 2,
  },
  popupText: {
    color: '#fff',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
    width: '45%',  // Ajuster la largeur pour mieux s'adapter
    alignItems: 'center',  // Centrer le texte dans le bouton
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ConnexionScreen;
