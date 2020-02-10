'use strict';
module.exports = (sequelize, DataTypes) => {
  const testTwo = sequelize.define('testTwo', {
    email: DataTypes.STRING
  }, {});
  testTwo.associate = function(models) {
    // associations can be defined here
  };
  return testTwo;
};