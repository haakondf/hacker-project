var express = require('express');
var router = express.Router();

/* GET all routes. */
router.get('/index', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/create-hacker', (req, res, next) => {
  res.render('create-hacker', { title: 'Express' });
});

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
  res.render("menu/hack-wanted-list")
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
  res.render("menu/ladder")
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
