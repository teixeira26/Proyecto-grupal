const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('owner', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,  
    },
    email:{
      type: DataTypes.STRING,
    },
    profilePicture:{
      type:DataTypes.STRING,
    },
    address:{
      type: DataTypes.STRING,
    },
    service:{
      type:DataTypes.STRING
    },
    description:{
      type:DataTypes.TEXT,
    },
    price:{
      type: DataTypes.STRING
    },
    typeOfHousing:{
      type: DataTypes.STRING
    },
    housingPhotos:{
      type: DataTypes.STRING
    },
    schedule:{
      type: DataTypes.STRING
    },
    dogsPerWalk:{
      type: DataTypes.STRING
    },
    
  })
};
