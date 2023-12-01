const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  const Desire = sequelize.define("Desire", {
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Desire;
};
