const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('owner', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING, 
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    profilePicture:{
      type:DataTypes.ARRAY(DataTypes.STRING),
    },
    address:{
      type: DataTypes.JSON(DataTypes.STRING),
    },
    favorites:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue:[]
    },
    pendingMessages:{
      type:DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue:[]
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
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBanned:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    }

  })
};