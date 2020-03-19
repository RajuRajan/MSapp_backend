'use strict';
module.exports = (sequelize, DataTypes) => {
  const feedbacks = sequelize.define('feedbacks', {
    userId: DataTypes.INTEGER,
    feed: DataTypes.STRING
  }, {});
  feedbacks.associate = function(models) {
    // associations can be defined here
  };
  return feedbacks;
};