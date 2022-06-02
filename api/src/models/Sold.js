const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('sold', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }    
  })
};