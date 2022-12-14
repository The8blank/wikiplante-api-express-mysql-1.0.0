const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Plante } = require("../dataBase/dataBase");
require("dotenv").config({ path: "./config/.env" });

exports.signUp = (req, res, next) => {
  try {
    const user = {
      username: body.username,
      email: body.email,
      password: body.password,
    };

    User.create(user)
      .then((user) => {
        token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(201).json({ user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.signIn = async (req, res, next) => {
  const user = await User.findOne({ where: { email: body.email } });

  if (user === null) {
    return res.status(404).json({ errors: "Email incorrect / inconnue" });
  }

  bcrypt.compare(body.password, user.password, function (err, result) {
    if (!result) {
      return res.status(401).json({ errors: "Mot de passe incorrect" });
    } else {
      token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: "24h",
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      res.status(200).json({ user: user.id });
    }
  });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({ users });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id,  {include : Plante } );

    if (!user) return res.status(404).json({ message: "Utilisateur inconnu" });

    const newRecord = {
      id : user.id,
      username : user.username,
      email: user.email ,
      isAdmin : user.isAdmin,
      Plantes: user.Plantes,
      createdAt : user.createdAt,
      updatedAt : user.updatedAt,
    }

    res.status(200).json({ user : newRecord });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.logOut = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    const newRecord = {
      ...body,
    };

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    if (user.id != res.locals.user.id)
      return res.status(400).json({ message: "Requ??te invalide !" });

    await user.update(newRecord);

    res.status(201).json({ message: "Utilisateur modifi??", user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    if (user.id != res.locals.user.id)
      return res.status(400).json({ message: "Requ??te invalide !" });

    await user.destroy();
    console.log("deleted user");
    res.status(200).json({ message: "Utilisateur supprim??" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la suppression", err });
  }
};
