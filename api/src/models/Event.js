const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Event', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    eventType: {
        type:DataTypes.ENUM('paseo', 'hospedaje'),
        allowNull: false,
    },
    payment: {
      type: DataTypes.ENUM('rejected', 'pending', 'approved'),
      allowNull: false
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }    
  });
};