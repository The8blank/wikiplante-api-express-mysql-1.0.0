const { Sequelize } = require("sequelize");
const UserModel = require("./Models/userModel"); // Import du model User
const PlanteModel = require("./Models/planteModel"); // Import du model Plante
const imagePlanteModel = require("./Models/imagePlanteModel"); // Import du model Image
require('dotenv').config({path: './config/.env'})

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  // Connexion à la base de donnée
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

const User = sequelize.define("User", UserModel);                      // Définit le model User
const ImagePlante = sequelize.define("ImagePlante", imagePlanteModel); // Définit le model ImagePlante
const Plante = sequelize.define("Plante", PlanteModel, {               // Définit le model Plante
  indexes: [
    {
      unique: true,
      fields: ["genre", "espece", "nom_commun"],                           
    },
  ],
}); 


User.hasMany(Plante, {
  onDelete: 'NO ACTION',
  type: Sequelize.UUID,
  foreignKey: "userId",
});

Plante.belongsTo(User, {
  type: Sequelize.UUID,
  foreignKey: "userId",
});

Plante.hasMany(ImagePlante, {
  onDelete: 'CASCADE',
  type: Sequelize.INTEGER,
  foreignKey: "planteId",
});

ImagePlante.belongsTo(Plante, {
  onDelete: 'NO ACTION',
  type: Sequelize.INTEGER,
  foreignKey: "planteId",
});

User.hasMany(ImagePlante, {
  onDelete: 'NO ACTION',
  type: Sequelize.UUID,
  foreignKey: "userId",
});

ImagePlante.belongsTo(User, {
  type: Sequelize.UUID,
  foreignKey: "userId",
});

module.exports = { sequelize, User, Plante, ImagePlante };
