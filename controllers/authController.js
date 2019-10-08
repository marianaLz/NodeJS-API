const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const randomStr = m => {
  var m = m || 9;
  (s = ""),
    (r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  for (let i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).json({ auth: false, message: "Unauthorized" });
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: "The session expired", err });
    req.user = await User.findById(decoded.id, { password: 0 });
    next();
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(async user => {
      if (!user) return res.status(404).json({ message: "User doesn't exist" });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid)
        return res.status(401).json({ message: "Incorrect password" });

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      delete user._doc.password;

      return res.status(200).json({ user, token });
    })
    .catch(error => {
      res.status(500).json({ error, message: "There was a login error" });
    });
};

exports.register = async (req, res) => {
  const salt = bcrypt.genSaltSync(256);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const hash = randomStr(70);

  const expiration = Date.now() + 86400000;
  const hashExpirationDate = new Date(expiration);

  const { body } = req;
  const { username } = req.body;

  User.findOne({ username }).then(user => {
    if (user && user.username === username)
      res.status(500).json({ message: "Username already exist" });

    if (!user) {
      const user = {
        ...body,
        password: hashedPassword,
        hash,
        hashExpirationDate
      };
      User.create(user)
        .then(user => {
          // create a token
          const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });
          return res.status(200).json({ auth: true, token });
        })
        .catch(errors => {
          return res
            .status(500)
            .json({ errors, msg: "There was a signup error" });
        });
    }
  });
};
