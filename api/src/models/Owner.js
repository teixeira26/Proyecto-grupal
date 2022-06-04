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
      unique: true
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
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
  })
};