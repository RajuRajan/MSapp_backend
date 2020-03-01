'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'bookings',
        'phoneNo',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'bookings',
        'address',
        {
          type: Sequelize.STRING
        }
      ),
      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
