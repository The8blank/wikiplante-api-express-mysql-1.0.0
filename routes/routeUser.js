const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  logOut,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

// auth
router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);

// user display "block"
router.get("/", getAllUsers);
router.get("/:id" /* id de l'user */, getOneUser);
router.put("/:id" /* id de l'user */, updateUser);
router.delete("/:id" /* id de l'user */, deleteUser);

module.exports = router;
