// utils/db.ts
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  // Charger les variables d'environnement depuis le fichier .env

// Configuration des accès à la base de données LoupGarouBD via les variables d'environnement
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Fonction générique pour effectuer des requêtes vers l'API backend
export const fetchData = async (endpoint: string, options: object = {}) => {
  try {
    const response = await axios(`${API_BASE_URL}${endpoint}`, options);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la requête:", error);
    throw new Error("Erreur de connexion à la base de données.");
  }
};

// Exemple : Fonction pour récupérer les données des joueurs
export const getPlayers = async () => {
  return fetchData('/players');
};

// Exemple : Fonction pour récupérer l'état d'une partie de Loup-Garou
export const getGameState = async (gameId: string) => {
  return fetchData(`/game/${gameId}`);
};
