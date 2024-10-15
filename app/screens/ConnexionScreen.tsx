import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../components/BackgroundImage';
import Logo from '../components/Logo';
import AnimatedTitle from '../components/AnimatedTitle';
import Footer from '../components/Footer'; // Importation du Footer

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
  const backgroundImage = require('../../assets/images/dark-forest-background.jpg'); // Vérifiez que ce chemin est correct
  const productionText = "Production Pandemania";

  // États pour gérer le formulaire
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(''); // État pour l'e-mail
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false); // État pour gérer les erreurs de connexion
  const [emailError, setEmailError] = useState(false); // État pour gérer les erreurs d'e-mail
  const [passwordsMatchError, setPasswordsMatchError] = useState(false); // État pour les erreurs de correspondance des mots de passe
  const [showConfirmation, setShowConfirmation] = useState(false); // État pour le pop-up de confirmation

  // Fonction de gestion de la connexion
  const handleLogin = () => {
    // Ici, vous devez ajouter la logique de vérification des identifiants
    if (username !== "correctUsername" || password !== "correctPassword") {
      // Afficher le pop-up d'erreur si les identifiants sont incorrects
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false); // Ferme le pop-up après 7 secondes
        resetFields();
      }, 7000);
    } else {
      router.push('/home'); // Logique de connexion ici
    }
  };

  // Fonction de gestion de l'inscription
  const handleSignup = () => {
    // Vérification des champs requis
    if (!username || !password || !confirmPassword || !email) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe doivent correspondre.");
      return;
    }

    // Validation de l'e-mail
    if (!validateEmail(email)) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
        resetFields();
      }, 7000);
      return;
    }

    // Validation du mot de passe
    if (passwordError) {
      Alert.alert("Erreur", "Le mot de passe ne répond pas aux exigences.");
      return;
    }

    // Afficher le pop-up de confirmation
    setShowConfirmation(true);
  };

  // Fonction pour valider l'e-mail (simulation)
  const validateEmail = (input: string) => {
    // Simulez la vérification d'un e-mail existant
    const existingEmails = ["test@example.com", "user@example.com"]; // Remplacez par votre logique de vérification
    return existingEmails.includes(input);
  };

  // Fonction de confirmation d'inscription
  const handleConfirmation = (isConfirmed: boolean) => {
    setShowConfirmation(false);
    if (isConfirmed) {
      // Logique pour envoyer la confirmation par email
      Alert.alert('Inscription réussie', 'Un email de confirmation a été envoyé.');
      // Réinitialiser les champs après l'inscription
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

  // Fonction pour valider le mot de passe
  const validatePassword = (input: string) => {
    const isValid = input.length >= passwordRequirements.minLength &&
      passwordRequirements.uppercase.test(input) &&
      passwordRequirements.number.test(input) &&
      passwordRequirements.special.test(input);
    
    setPasswordError(!isValid);
  };

  // Fonction pour valider la correspondance des mots de passe
  useEffect(() => {
    if (isSignup) {
      if (confirmPassword.length > 0 && password !== confirmPassword) {
        setPasswordsMatchError(true);
      } else {
        setPasswordsMatchError(false);
      }
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

        {/* Champ de connexion */}
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
            if (text) setShowPasswordInfo(true);
            else setShowPasswordInfo(false);
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
              style={styles.input} // Utiliser le même style 'input' pour avoir la même taille
              placeholder="Confirmer le mot de passe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TextInput
              style={styles.input} // Utiliser le même style 'input' pour avoir la même taille
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

        <TouchableOpacity style={styles.button} onPress={() => {
          if (isSignup) {
            handleSignup();
          } else {
            handleLogin();
          }
        }}>
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

        {/* Pop-up de confirmation d'inscription */}
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

        {/* Pop-up d'erreur de connexion */}
        {loginError && (
          <View style={styles.popup}>
            <Text style={styles.popupText}>Erreur de login et/ou mot de passe, veuillez recommencer.</Text>
            <TouchableOpacity onPress={() => setLoginError(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Footer /> {/* Ajout du Footer */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1, // S'assurer que le formulaire est au-dessus du gradient
  },
  input: {
    height: 50,
    width: '40%', // Conserver la largeur pour tous les champs
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: 'rgba(255, 69, 0, 0.8)',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  signupButton: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
    marginTop: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  passwordInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: 'center',
    width: '80%',
  },
  passwordInfoText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -width * 0.15 }, { translateY: -50 }],
    backgroundColor: 'rgba(255, 69, 0, 0.8)', // Couleur du pop-up (identique au bouton d'inscription)
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,
    width: '30%', // Largeur du pop-up à 30%
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: '#000', // Couleur de la bordure
    elevation: 10, // Pour Android
  },
  popupText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#000',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ConnexionScreen;
