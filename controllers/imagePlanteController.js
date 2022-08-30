const {
    ImagePlante,
    Plante,
    User
} = require ('../dataBase/database');
const { userId } = require('../dataBase/Models/imagePlanteModel');

exports.uploadPlante = async (req, res, next) => { 
    JSON.parse(JSON.stringify(req.body));                                                 
    try {
      const plante = await Plante.findByPk(req.params.id);
      const userId = res.locals.user.id

      const newRecord = {
        cible: req.body.cible,
        lien : req.file.filename,
        planteId: plante.id,
        userId
      }

      ImagePlante
      .create({
        ...newRecord
      })
      .then((plante, err) => {                                                         
        res.status(201).json({                                                       // Renvoit un status 201 Created !         
          message: "image upload success",                                                    // Avec le message plante created                                                                     // Et l'objet plante
        });
      })

    } 
    catch (err) {
      return res.status(500).json({ error: err });                                                            
    }
}
exports.deleteImagePlante = async (req, res) => {                                             // Supprime une plante 
    try {
      const imagePlante = await ImagePlante.findByPk(req.params.id);                            // Trouve la plante grâce à l'id passé en paramètre de l'url 
  
      if (imagePlante === null) {                                                        // Si la plante est égal à null
        return res.status(401).json({ message: "image not found" });                     // Envoit plante not found
      }
  
      if (imagePlante.userId != res.locals.user.id)                                      // Control si la requête est initié par le créateur de la plante
        return res                                                                  // Renvoit un status 400 Invalid request !
          .status(400)
          .json({ message: "Invalid request ! You are not allowed to delete" });
      else {
        await imagePlante.destroy();                                                     // Supprime la plante  
        res.status(200).json({ message: "image deleted" });                          // Res un status 200 OK ! Avec la message plante deleted
      }
    } catch (err) {
      return res.status(500).json({ error: err });                                // Renvoit un status 500 Internal Server Error ! Avec l'erreur'
    }
};  