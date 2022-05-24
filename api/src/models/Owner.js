const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Owner', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true,
      }
    },
    lastName:{
      type: DataTypes.STRING, 
      allowNull: false,
      validate:{
        isAlpha: true,
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profilePicture:{
      type:DataTypes.ARRAY(DataTypes.STRING),
    },
    address:{
      type: DataTypes.JSON(DataTypes.STRING),
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
  })
};
