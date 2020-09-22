'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'bids',
        'score',
        {
          type: Sequelize.DECIMAL
        }
      )
      
    ]);
  },
  down: (queryInterface, Sequelize) => {
    
  }
};
