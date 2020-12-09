'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emetteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Emetteur.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type:DataTypes.STRING,
    },
    prenom:{
      type: DataTypes.STRING,
    },
    tel: {
      type:DataTypes.STRING,
    },
    cin: {
      type:DataTypes.STRING,
    },
    email:{
      type:DataTypes.STRING,
    },
    password:{
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Emetteur',
  });
  Emetteur.associate = models => {
    Emetteur.belongsTo(models.Envoi);
  };
  return Emetteur;
};