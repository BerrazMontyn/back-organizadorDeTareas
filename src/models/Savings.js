const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  const Savings = sequelize.define("Savings", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Savings;
};
