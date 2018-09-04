var express = require('express');
var router = express.Router();
const uploadCloud = require('../utils/cloudinary.js');
const User = require('../models/User.js')

/* GET all routes. */
router.get('/index', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/create-hacker', (req, res, next) => {
  res.render('create-hacker', { title: 'Express' });
});

router.post('/create-hacker', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newUser = new User({title, description, imgPath, imgName})
  newUser.save()
  .then(user => {
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  })
})

router.get("/", (req,res, next) => {
  res.render("menu/home")
})

router.get("/home", (req,res, next) => {
  res.render("menu/home")
})

router.get("/hack/crimes", (req,res, next) => {
  res.render("menu/hack-crimes")
})

router.get("/hack/hack-player", (req,res, next) => {
  res.render("menu/hack-player")
})

router.get("/hack/wanted-list", (req,res, next) => {
  User.find({}).then((user) => {
    res.render("menu/hack-wanted-list", {user})
  }).catch(console.error)
})

router.get("/alliance/forum", (req,res, next) => {
  res.render("menu/alliance-forum")
})

router.get("/alliance/group-kill", (req,res, next) => {
  res.render("menu/alliance-group-kill")
})

router.get("/alliance/hideout", (req,res, next) => {
  res.render("menu/alliance-hideout")
})

router.get("/marketplace", (req,res, next) => {
  res.render("menu/marketplace")
})

router.get("/system-repair", (req,res, next) => {
  res.render("menu/system-repair")
})

router.get("/ladder", (req,res, next) => {
  User.find({}).then((user) => {
    res.render("menu/ladder", {user})
  }).catch(console.error)
})

router.get("/information", (req,res, next) => {
  res.render("menu/information")
})

router.get("/arcade", (req,res, next) => {
  res.render("menu/arcade")
})

router.get("/logout", (req,res, next) => {
  res.render("menu/logout")
})

module.exports = router;

