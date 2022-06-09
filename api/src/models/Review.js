const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('review', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    } ,
    review:{
      type: DataTypes.INTEGER,
      validate:{
        min:0,
        max:5
      }
    }
  })
};