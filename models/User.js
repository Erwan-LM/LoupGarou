const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../utils/db');  // Connexion à la base de données

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  confirmationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Hachage du mot de passe avant la sauvegarde
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
