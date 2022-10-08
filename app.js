const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')        // Import du module cookie parser, permet de lire les cookies
const cors = require('cors')   

const { sequelize } = require('./dataBase/dataBase')            // Import de la connexion à la base de donné
const {checkUser, requireAuth} = require('./middlewares/auth')  // Import des middlewares d'authentification


const routeUser = require('./routes/routeUser.js')      // Import des routers User
const routePlante = require('./routes/routePlante.js');     // Import des routers Plante


sequelize.authenticate()                                                            // test de connexion à la db 
.then(() => {
    console.log("\x1b[1m","\x1b[34m","connexion établie à la base de donnée")       // Décoration de la console parce que c'est beau
    sequelize.sync()                                                                // Synchonisation de toutes les tables définit par les modèles 
})
.catch((err) => console.log(err))


const corsOptions = {
    origin:'http://127.0.0.1:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))         // Paramètre les autorisations
app.use(cookieParser())            // cookie parser "Permet de lire les cookies"
app.use(express.json())            // parse le body de la requete

app.use('*', checkUser)                                         // Ajout du middlewares d'authentification sur toutes les routes

app.use('/', (req, res, next) => {          // Définit la variable body, pour la récupérer sans taper req.
    body = req.body
    next()
})


app.use('/api/user', routeUser)         // Routes pour les users
app.use('/api/plante', routePlante)         // Routes pour les plantes

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


module.exports = app