const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

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
    profilePicture:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
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