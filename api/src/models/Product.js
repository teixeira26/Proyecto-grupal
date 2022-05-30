const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('alimento', 'accesorios', 'salud y bienestar'),
        allowNull: false,
    },
    weight:{
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    photos:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    },
    profilePicture:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetAnimal:{
        type: DataTypes.ENUM('perro', 'gato', 'tortuga', 'conejo', 'pez', 'hamster', 'pajaro', 'otro'),
        allowNull: false,
    },
    tradeMark:{
        type: DataTypes.ENUM('pro plan', 'pedigree', 'vital can', 'eukanuba'),
        allowNull: false,
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
  })
};