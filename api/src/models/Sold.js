const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("sold", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
      
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false

    },
    date_created: {
      type: DataTypes.STRING,
      allowNull: false

    },
    transaction_amount: {
      type: DataTypes.STRING,
      allowNull: false

    },
  });
};
