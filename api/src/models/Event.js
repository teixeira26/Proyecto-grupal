const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('event', {
    idMP: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_created: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    eventType: {
        type:DataTypes.ENUM('paseo', 'hospedaje'),
        allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT
    },
    payment: {
      type: DataTypes.ENUM('rejected', 'pending', 'approved'),
      allowNull: false,
      defaultValue: 'pending'
    },
    price: {
      type: DataTypes.INTEGER,
    },
    petName: {
      type: DataTypes.STRING
    },
    providerName:{
      type:DataTypes.STRING,
    },
    ownerName:{
      type:DataTypes.STRING,
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }    
  });
};