const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const PlanteModel = {
  id : {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  nom_commun : {
    allowNull: false,
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },
    
  genre : {
    allowNull: false,
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  espece : {
    allowNull: false,
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  sous_espece_cultivar : {
    allowNull: false,
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  famille : {
    allowNull: false,
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  ordre : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },
  categorie : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  port : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  couleur_feuillage : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  couleur_floraison : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  periode_floraison : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  description_feuillage : {
    type: Sequelize.TEXT,
    validate : {
        min: 1,
        max: 255
      }
  },

  description_floraison : {
    type: Sequelize.TEXT,
    validate : {
        min: 1,
        max: 255
      }
  },

  description_fruit : {
    type: Sequelize.TEXT,
    validate : {
        min: 1,
        max: 255
      }
  },

  description : {
    allowNull: false,
    type: Sequelize.TEXT,
    validate : {
        min: 1,
        max: 255
      }
  },

  exposition : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
  },

  sol : {
    type: Sequelize.STRING,
    validate : {
        min: 1,
        max: 255
      }
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
  
  isCompleted : {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
 
};

module.exports = PlanteModel
