const User = require("../../models/admin");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

router.post("/register", function (req, res) {
  const { name, password, password2 } = req.body;
  switch (name, password, password2) {
    case password.length < 6:
      return res.status(400).json({ msg: "Password must be six characters or longer." })
    case password != password2:
      return res.status(400).json({ msg: "Passwords do not match." })
    case !name || !password || !password2:
      return res.status(400).json({ msg: "Please fill out all fields." })
  }
  User.findOne({ name })
    .then(user => {
      if (!user) {
        User.findOne({ name })
          .then(user => {
            if (!user) {
              let salt = bcrypt.genSaltSync(10);
              User.create({
                name: name,
                password: bcrypt.hashSync(password, salt),
              }).then(user => {
                jwt.sign({
                  id: user.id
                }, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.username
                    }
                  });
                  console.log(`${user.name} added to database.`)
                })
              })
            }
          })

      } else if (user) {
        return res.status(400).json({ msg: "User already exists." })
      }

    }).catch(function (err) { res.status(422).json({ msg: err }) });
})

router.post("/login", function (req, res) {
  console.log(req.body)
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ msg: "Please fill out all fields." })
  } else {
    User.findOne({ name: user })
      .then(user => {
        if (!user) {
          return res.status(400).json({ msg: "Non-existent user." })
        } else if (user && bcrypt.compareSync(password, user.password)) {
          jwt.sign({
            id: user.id
          }, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                user: user.name
              }
            });
          })
        } else {
          return res.status(400).json({ msg: "Invalid credentials." })
        }
      }).catch(function (err) { res.status(422).json({ msg: err }) });
  }
})


router.post('/user', (req, res) => {
  if (req.body.token) {
    User.findById(req.body.id)
      .select('-password')
      .then(user => res.json(user));
  } else {
    res.status(400).json(null)
  }
});

module.exports = router;