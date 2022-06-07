require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/proyecto`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {Owner, Pet, Provider, Chat, Event, Review, Product, Sold} = sequelize.models;

// Relaciones
Owner.hasMany(Pet);
Pet.belongsTo(Owner);

Owner.hasMany(Chat);
Chat.belongsTo(Owner);

Owner.hasMany(Review);
Review.belongsTo(Owner);

Provider.belongsToMany(Pet, {
  through: 'Provider-Pet'
});

Pet.belongsToMany(Provider, {
  through: 'Provider-Pet'
});

Pet.hasMany(Event);
Event.belongsTo(Pet);

Provider.hasMany(Event);
Event.belongsTo(Provider);

Provider.hasMany(Chat);
Chat.belongsTo(Provider);

Provider.hasMany(Review);
Review.belongsTo(Provider);

Owner.belongsToMany(Product, {
  through: Sold
});

Product.belongsToMany(Owner, {
  through: Sold
});

Provider.belongsToMany(Product, {
  through: Sold
});

Product.belongsToMany(Provider, {
  through: Sold
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};