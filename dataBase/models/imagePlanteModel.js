const Sequelize = require('sequelize');


const imagePlanteModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: Sequelize.UUID,
    allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
  },

  planteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    reference : {
        model : 'Plantes',
        key : "id"
    }
  },

  cible: {
    type: Sequelize.STRING(50),
    trim: true,
    lowercase: true,
    allowNull: false,
    validate : {
      is : /^[a-z ,.'-]+$/i,
      min : 2,
      max: 40
    }
  },

  lien: {
    type: Sequelize.STRING(1024),
    allowNull: false,
  }

};

module.exports = imagePlanteModel
