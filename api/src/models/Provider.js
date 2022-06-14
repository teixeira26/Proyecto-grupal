const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('provider', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING, 
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    profilePicture:{
      type:DataTypes.STRING
    },
    address:{
      type:DataTypes.JSONB
    },
    service:{
      type: DataTypes.ARRAY(DataTypes.ENUM('paseo', 'hospedaje'))
      
    },
    description:{
      type:DataTypes.TEXT
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
    pendingMessages:{
      type:DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue:[]
    },
    schedule: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    latitude:{
      type:DataTypes.FLOAT,
      defaultValue:-27.7734016
    },
    longitude:{
      type:DataTypes.FLOAT,
      defaultValue:-58.6252288
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
  })
};