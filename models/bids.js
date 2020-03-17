'use strict';
module.exports = (sequelize, DataTypes) => {
  const bids = sequelize.define('bids', {
    bookingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    bidAmount:DataTypes.STRING
  }, {});
  bids.associate = function(models) {
    // associations can be defined here
  bids.belongsTo(models.bookings,{
    foreign_key:'bookingId',
    targetKey:'bookingId'
  })
  };
  return bids;
};