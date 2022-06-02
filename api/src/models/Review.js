const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('review', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    } 
  })
};