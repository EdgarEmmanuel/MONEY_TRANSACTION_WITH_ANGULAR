'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Envoi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Envoi.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date:{ type:DataTypes.DATE},
    type_transaction:{ type:DataTypes.STRING},
    montant: {type:DataTypes.DOUBLE}
  }, {
    sequelize,
    modelName: 'Envoi',
  });
  return Envoi;
};