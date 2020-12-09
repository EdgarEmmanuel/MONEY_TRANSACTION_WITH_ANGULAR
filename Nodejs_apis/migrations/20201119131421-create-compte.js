'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comptes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      solde: {
        type: Sequelize.DOUBLE
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }).then(() => {
      // Compte hasOne Emetteur
      return queryInterface.addColumn(
        'Comptes', // name of Target model
        'userId', // name of the key we're adding
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
    await queryInterface.dropTable('Comptes');
  }
};