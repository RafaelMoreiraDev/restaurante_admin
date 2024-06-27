'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log('Starting migration to change column...');
      await queryInterface.changeColumn('Categoria', 'nome', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
      console.log('Column changed successfully.');
    } catch (error) {
      console.error('Error during migration:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log('Starting rollback to change column...');
      await queryInterface.changeColumn('Categoria', 'nome', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      });
      console.log('Column rollback successfully.');
    } catch (error) {
      console.error('Error during rollback:', error);
    }
  }
};
