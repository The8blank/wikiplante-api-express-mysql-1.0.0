const express = require("express");
const router = express.Router();


const {
    createPlante,
    getAllPlante,
    deleteOnePlante,
    updateOnePlante,
    getUserPlante,
    getOnePlante,
} = require("../controllers/planteController.js");

const upload = require("../config/multer")
const {
  uploadPlante,
  deleteImagePlante
} = require('../controllers/imagePlanteController')

// ROUTES PLANTES
router.post("/", createPlante);
router.put("/:id"     /* id du post à modifier */, updateOnePlante);
router.delete("/:id"  /* id du post à supprimer */ , deleteOnePlante);

router.get("/", getAllPlante);
router.get("/user/:id" /* id de l'user */  , getUserPlante);
router.get("/:id"      /* id de la plante */    , getOnePlante);

// UPLOAD 

router.post('/upload:id', upload.single('imagePlante'), uploadPlante);
router.delete('/upload/delete:id', deleteImagePlante)

module.exports = router;