const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("sold", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
    },
    firs_name: {
      type: DataTypes.STRING,
      
    },
    last_name: {
      type: DataTypes.STRING,
      
    },
    name_product: {
      type: DataTypes.STRING,
     
    },
    quantity: {
      type: DataTypes.INTEGER,
 
    },
    status: {
      type: DataTypes.STRING,

    },
    date_created: {
      type: DataTypes.STRING,

    },
    transaction_amount: {
      type: DataTypes.STRING,
     
    },
  });
};
