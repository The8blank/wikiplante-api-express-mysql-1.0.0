const {User, Plante, ImagePlante} = require('../dataBase/database')

exports.getUserPlante = async (req, res) => {                                         // Envoit toutes les plantes d'un utilisateur 
  try {
    const user = await User.findByPk(req.params.id,{include: ImagePlante});                                        // Trouve l'utilisateur grace à l'id placé en paramètre de l'url
    const plante = await user.getPlantes();                                                 // Récupère les plantes de l'utilisateur grâce à sa cléf étrangère

    if (!plante) {                                                                          // Si la constante plante renvoit false
      return res.status(404).json({ error: "Plantes not found" });                          // Envoit plante not fount
    }
    res.status(200).json({ plante });                                                       // Res un status 200 OK ! Avec les plantes de l'utilisateur
  } 
  catch (err) {
    return res.status(500).json({ err });                                                   // Res un status 500 Internal Server Error ! Avec l'erreur 
  }
};

exports.getOnePlante = async (req, res) => {                                          // Envoit une plante 
  try {
    const plante = await Plante.findByPk(req.params.id,{include: ImagePlante});                                    // Trouve la plante grâce à son id placé en paramètre de l'url

    if (!plante) {                                                                          // Si la constant plante renvoit false        
      return res.status(404).json({ message: "plante not found" });                           // Envoit plantes not found
    }
    res.status(200).json({ plante });                                                      // Res un status 200 OK ! Avec les plantes
  } catch (err) {
    res.status(500).json({ err });                                                         // Res un status 500 Internal Server Error ! Avec l'erreur 
  }
};

exports.getAllPlante = async (req, res) => {                                          // Tous les plante des utilisateurs
  try {
    const plante = await Plante.findAll({include: ImagePlante});                                                // Trouves tous les plante dans la base de donnée

    if (!plante) {                                                                        // si la constante plante renvoit false
      return res.status(404).json({ error: "plante not found" });                            // Res un status 404 Not fount ! Avec plante not found
    }
    res.status(200).send(plante);                                                         // Res un status 200 OK ! Avec les plante
  } catch (err) {
    return res.status(500).json({ err });                                                 // Res un status 500 Internal Server Error ! Avec l'erreur 
  }
};

exports.createPlante = async (req, res) => {                                         // Crée une plante dans la base de donnée
    JSON.parse(JSON.stringify(req.body));                                                 // Parse les données de la requete, il est possible parfoit d'avoir des donnée en format text
    try {
      const user = await User.findByPk(res.locals.user.id);                              // Trouve l'user dans la base de donnée graçe à son id dans les locals
  
      const plante = {                                                                   // Définit la constante plante
            ...body,                                                                        //contient la variable content de l'objet body
      };
  
      user    
        .createPlante({                                                                 // Crée la plante grâce à l'instance de user   
          ...plante,                                                                      // la plante content les données de l'objet plante
        })
        .then((plante, err) => {                                                         
          res.status(201).json({                                                       // Renvoit un status 201 Created !         
            message: "plante created",                                                    // Avec le message plante created
            plante,                                                                       // Et l'objet plante
          });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });                                // Renvoit un status 400 Invalid request ! Avec l'erreur
        });
    } 
    catch (err) {
      return res.status(500).json({ error: err });                                    // Renvoit un status 500 Internal Server Error ! Avec l'erreur'                         
    }
};

exports.deleteOnePlante = async (req, res) => {                                             // Supprime une plante 
    try {
      const plante = await Plante.findByPk(req.params.id);                            // Trouve la plante grâce à l'id passé en paramètre de l'url 
  
      if (plante === null) {                                                        // Si la plante est égal à null
        return res.status(401).json({ message: "plante not found" });                     // Envoit plante not found
      }
  
      if (plante.userId != res.locals.user.id)                                      // Control si la requête est initié par le créateur de la plante
        return res                                                                  // Renvoit un status 400 Invalid request !
          .status(400)
          .json({ message: "Invalid request ! You are not allowed to delete" });
      else {
        await plante.destroy();                                                     // Supprime la plante  
        res.status(200).json({ message: "plante deleted" });                          // Res un status 200 OK ! Avec la message plante deleted
      }
    } catch (err) {
      return res.status(500).json({ error: err });                                // Renvoit un status 500 Internal Server Error ! Avec l'erreur'
    }
};      

exports.updateOnePlante = async (req, res) => {                                       //  Update une plante  
    JSON.parse(JSON.stringify(req.body));
    try {
      const plante = await Plante.findByPk(req.params.id);                           // Trouve la plante grâce à son id placé en paramètre de l'url'
  
      if (plante === null) {                                                       // Si la plante est égal à null 
        return res.status(401).json({ message: "plante not found" });                  // Renvoit un status 401 Not found ! Avec le message plante not found      
      }
  
      if (plante.userId != res.locals.user.id || res.locals.user.isAdmin == false)                                     // Control si la requête est initié par le createur de la plante
        return res                                                                  // Renvoit un status 400 Invalid request ! 
          .status(400)
          .json({ message: "Invalid request ! You are not allowed to update" });
  
      const newRecord = {                                                        // Définit le New Record
        ...req.body,
      };

      await plante                                                                 // Update la plante
        .update(newRecord)
        .then((post) => {
          res.status(201).json({ message: "plante update", plante });                   // Renvoit un status 201 Created !
        })
        .catch((err) => {
          return res.status(500).json({ error: err });                              // Renvoit un status 500 Internal Server Error ! Avec l'erreur'
        });
    } catch (err) {
      return res.status(500).json({ error: err });                                  // Renvoit un status 500 Internal Server Error ! Avec l'erreur'
    }
};