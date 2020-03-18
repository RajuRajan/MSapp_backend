"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bidHour: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      serviceTime: {
        type: Sequelize.STRING
      },
      subCategory: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      bookingId: {
        type: Sequelize.INTEGER
      },
      bookingStatus: {
        type: Sequelize.STRING
      },
      bookingTime: {
        type: Sequelize.STRING
      },
      captainCharge: {
        type: Sequelize.STRING
      },
      isappointmentFixed: {
        type: Sequelize.BOOLEAN
      },
      isrejected: {
        type: Sequelize.BOOLEAN
      },
      captainName: {
        type: Sequelize.STRING
      },
      captainNumber: {
        type: Sequelize.STRING
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("bookings");
  }
};
