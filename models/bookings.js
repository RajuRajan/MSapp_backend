'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookings = sequelize.define('bookings', {
    bidHour: DataTypes.STRING,
    city: DataTypes.STRING,
    pincode: DataTypes.STRING,
    serviceTime: DataTypes.STRING,
    subCategory: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookingId: DataTypes.INTEGER,
    bookingStatus: DataTypes.STRING,
    bookingTime: DataTypes.STRING,
    captainCharge: DataTypes.INTEGER,
    isappointmentFixed: DataTypes.BOOLEAN,
    isrejected: DataTypes.BOOLEAN,
    captainName: DataTypes.STRING,
    captainNumber: DataTypes.STRING,
    address:DataTypes.STRING,
    phoneNo: DataTypes.STRING,
  }, {});
  bookings.associate = function(models) {
    // associations can be defined here
  };
  return bookings;
};