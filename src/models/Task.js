const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
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
    description: {
      type: DataTypes.TEXT,
    },
    time: {
      type: DataTypes.TIME,
    },
    date: {
      type: DataTypes.DATE,
    },
  });

  return Task;
};
