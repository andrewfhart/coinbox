"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserInfo = sequelize.define("UserInfo", {
    age: DataTypes.INTEGER,
    currency: {type: DataTypes.CHAR, defaultValue: '$'},
    fi_goal: DataTypes.DECIMAL(20, 2), // financial independence income goal
    nw_goal: DataTypes.DECIMAL(20, 2), // combined net worth goal
    sm_goal: DataTypes.DECIMAL(20, 2)  // savings (monthly) goal
  }, {
    classMethods: {
      associate: function(models) {
        UserInfo.belongsTo(models.User);
      }
    }
  });

  return UserInfo;
};
