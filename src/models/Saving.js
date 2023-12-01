const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  const Saving = sequelize.define("Saving", {
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
  });

  return Saving;
};
