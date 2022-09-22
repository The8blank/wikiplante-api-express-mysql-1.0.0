const express = require("express");
const { routes } = require("../app.js");
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
const { requireAuth } = require("../middlewares/auth.js");

// auth
router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);
router.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.id)
})

// user display "block"
router.get("/", getAllUsers);
router.get("/:id" /* id de l'user */, getOneUser);
router.put("/:id" /* id de l'user */, updateUser);
router.delete("/:id" /* id de l'user */, deleteUser);

module.exports = router;
