const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Wishes = sequelize.define("Whises", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Wishes;
};
