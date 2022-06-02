const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('pet', {
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