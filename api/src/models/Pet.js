const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true,
      }
    },
    profilePicture:{
      type:DataTypes.ARRAY(DataTypes.STRING),
    },
    type:{
        type: DataTypes.ENUM('Perro', 'Gato', 'Tortuga', 'Conejo', 'Pez', 'Hamster', 'Pajaro', 'Otro'),
        allowNull:false
    },
    race:{
        type:DataTypes.STRING
    },
    size:{
        type:DataTypes.ENUM('Grande', 'Mediano', 'Chico'),
    },
    description:{
        type:DataTypes.TEXT,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue: true,
      }
    
  })
};