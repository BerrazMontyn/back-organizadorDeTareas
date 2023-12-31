const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/odt`,
  {
    logging: false,
    native: false,
    dialectOptions: {
      useUTC: false,
    },
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const User = require("./models/User")(sequelize);
const Task = require("./models/Task")(sequelize);
const Expense = require("./models/Expense")(sequelize);
const Saving = require("./models/Saving")(sequelize);
const Desire = require("./models/Desire")(sequelize); 

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.belongsToMany(Task, { through: "User-task" });
Task.belongsToMany(User, { through: "User-task" });

User.belongsToMany(Expense, { through: "User-expense" });
Expense.belongsToMany(User, { through: "User-expense" });

User.hasOne(Saving);
User.hasOne(Desire);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
