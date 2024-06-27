'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Items');
    if (!table.CategoriaId) {
      await queryInterface.addColumn('Items', 'CategoriaId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categorias',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Items', 'CategoriaId');
  }
};
