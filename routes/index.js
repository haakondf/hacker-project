var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Crime = require("../models/Crime");
const uploadCloud = require("../utils/cloudinary.js");

/* GET all routes. */
router.get("/index", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/create-hacker", (req, res, next) => {
  res.render("create-hacker", { title: "Express" });
});

router.post("/create-hacker", uploadCloud.single("photo"), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newUser = new User({ title, description, imgPath, imgName });
  newUser
    .save()
    .then(user => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/", (req, res, next) => {
  res.render("menu/home");
});

router.get("/home", (req, res, next) => {
  res.render("menu/home");
});

router.get("/hack/crimes", (req, res, next) => {
  // TODO list all crimes with link to GET /hack/crimes/:id
  res.render("menu/hack-crimes");
});

router.get("/hack/crimes/:id", (req, res, next) => {
  let userIdThing = User.findById(req.user._id)
  let crimeIdThing = Crime.findById(req.params.id)

  Promise.all([userIdThing, crimeIdThing]).then((result) => {
    let resultCrime = result[0].fightCrime(result[1]);
    res.render("menu/hack-crimes-id", {result: JSON.stringify(resultCrime)})
  })




  // Crime.findById(req.params.id).then(result => {
  //   crimeToCommit = result;
  //   res.render("menu/hack-crimes-id", {
  //     result: JSON.stringify(crimeToCommit)
  //   });
  // });
});

// TODO get the user from req.user
// get the crime from db
// do the actual fight: let result = fight()
// render the result page with the result

//   res.render("menu/hack-crimes", {
//     result: JSON.stringify({ rounds: [{dodged: true}], won: true})
//   })
// })

router.get("/hack/hack-player", (req, res, next) => {
  res.render("menu/hack-player");
});

router.get("/hack/wanted-list", (req, res, next) => {
  User.find({})
    .then(user => {
      res.render("menu/hack-wanted-list", { user });
    })
    .catch(console.error);
});

router.get("/alliance/forum", (req, res, next) => {
  res.render("menu/alliance-forum");
});

router.get("/alliance/group-kill", (req, res, next) => {
  res.render("menu/alliance-group-kill");
});

router.get("/alliance/hideout", (req, res, next) => {
  res.render("menu/alliance-hideout");
});

router.get("/marketplace", (req, res, next) => {
  res.render("menu/marketplace");
});

router.get("/system-repair", (req, res, next) => {
  res.render("menu/system-repair");
});

router.get("/ladder", (req, res, next) => {
  User.find({})
    .then(user => {
      res.render("menu/ladder", { user });
    })
    .catch(console.error);
});

router.get("/information", (req, res, next) => {
  res.render("menu/information");
});

router.get("/arcade", (req, res, next) => {
  res.render("menu/arcade");
});

router.get("/logout", (req, res, next) => {
  res.render("menu/logout");
});

module.exports = router;
