const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('chat', {
    message: {
      type: DataTypes.JSON,
      allowNull: false,
    }    
  })
};