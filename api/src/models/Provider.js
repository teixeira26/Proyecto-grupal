const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('provider', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate:{
      //   isAlpha: true,
      // }
    },
    lastName:{
      type: DataTypes.STRING, 
      allowNull: false,
      // validate:{
      //   isAlpha: true,
      // }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    profilePicture:{
      type:DataTypes.STRING,
    },
    adress:{
      type:DataTypes.JSONB,
    },
    service:{
      type:DataTypes.ENUM('paseo', 'hospedaje')
    },
    description:{
      type:DataTypes.TEXT,
    },
    price:{
    type: DataTypes.INTEGER
    },
    typeOfHousing:{
      type: DataTypes.ENUM('casa', 'departamento', 'quinta')
    },
    housingPhotos:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    dogsPerWalk:{
      type: DataTypes.INTEGER
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
    
  })
};