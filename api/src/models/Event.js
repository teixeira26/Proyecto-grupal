const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Event', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventType:{
        type:DataTypes.ENUM('Paseo', 'Hospedaje'),
        allowNull: false,
    }    
  })
};