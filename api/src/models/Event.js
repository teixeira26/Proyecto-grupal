const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Event', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventType: {
        type:DataTypes.ENUM('paseo', 'hospedaje'),
        allowNull: false,
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }    
  });
};