const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    const Expense = sequelize.define('Expense', {
      id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Expense;
};
