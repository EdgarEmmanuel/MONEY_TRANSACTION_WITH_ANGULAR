'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Envois', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      type_transaction:{
        type:Sequelize.STRING
      },
      montant: {
        type: Sequelize.DOUBLE
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }) .then(() => {
      // Envois hasOne Emetteur
      return queryInterface.addColumn(
        'Envois', // name of Target model
        'emmeteurId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Emetteurs', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    }).then(() => {
      // Envois hasOne Recepteur
      return queryInterface.addColumn(
        'Envois', // name of Target model
        'RecepteurId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Emetteurs', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Envois');
  }
};