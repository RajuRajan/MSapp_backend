'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'bids',
        'bidAmount',
        {
          type: Sequelize.STRING
        }
      )
      
    ]);
  },
  down: (queryInterface, Sequelize) => {
    
  }
};
