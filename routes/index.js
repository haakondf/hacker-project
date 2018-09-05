var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Crime = require("../models/Crime");
const Alliance = require("../models/Alliance");
const Item = require("../models/Item");
const uploadCloud = require("../utils/cloudinary.js");

/* GET all routes. */
router.get("/index", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// Legg til funksjonen "ensureAuthenticated" til alle GET sidene man må være pålogget for å se

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/sign-in')
  }
}

// TODO add isSetup to user model, defautls to false
  // TODO maybe log req.user to see what the object is and if we have the value for isSetup
function ensureIsSetup (req, res, next) {
  if (req.user.isSetup()) {
    return next();
  } else {
    res.redirect('create-hacker')
  }
}

// function demanding that character is created, otherwise it will redirect to create hacker page
function ensureIsSetup(req, res, next) {
  
  if (req.user.isSetup) {
    return next();
  } else {
    res.redirect('/create-hacker')
  }
}
router.get("/create-hacker", ensureAuthenticated, (req, res, next) => { // ensure user is logged in
  res.render("create-hacker", { title: "Express" });
});


router.post("/create-hacker", uploadCloud.single("photo"), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  console.log("req user consolelog", req.user);
  //User.findById /// add { title, description, imgPath, imgName });
  // now isSetup is changed to true upon image upload. This should be changed to play/create button
  User.findByIdAndUpdate(req.user._id, { title, description, imgPath, imgName, isSetup: true }).then((result) => {
    console.log(result);
    res.render('index')
  })

  // const newUser = new User({ title, description, imgPath, imgName });
  // newUser
  //   .save()
  //   .then(user => {
  //     res.redirect("/");
  //   })
    .catch(error => {
      console.log(error);
      res.redirect("error");
    });
});

router.get("/", (req, res, next) => {

  if (req.user) {

    res.render("menu/home");
  } else {
    res.render("homeinfo")

  }
});


router.get("/hack/crimes", ensureAuthenticated,(req, res, next) => {
  // TODO list all crimes with link to GET /hack/crimes/:id
  res.render("menu/hack-crimes");
});

router.get("/hack/crimes/:id", (req, res, next) => {
  let userIdThing = User.findById(req.user._id);
  let crimeIdThing = Crime.findById(req.params.id);

  Promise.all([userIdThing, crimeIdThing]).then(result => {
    if (result[0].battery < 7) return res.render("menu/hack-crimes-id-error", {error: "Insufficient battery!"});
    if (result[0].currentFirewall <= 0) return res.render("menu/hack-crimes-id-error", {error:"You need a firewall to be able to commit crimes!"})
    let resultCrime = result[0].fightCrime(result[1]);
    res.render("menu/hack-crimes-id", {
      result: JSON.stringify(resultCrime)
    });
  });
});

router.get("/hack/hack-player", (req, res, next) => {
  User.find({}).then(user => {
    res.render("menu/hack-player", { user });
  });
});

router.get("/hack/hack-player/:id", (req, res, next) => {
  let newReq = req.params.id.slice(1);
  let userIdThing = User.findById(req.user._id);
  let opponentIdThing = User.findById(newReq);
  Promise.all([userIdThing, opponentIdThing]).then(result => {
    if (result[0].name === result[1].name) return res.render("menu/hack-player-id-error", {error:"You can't hack yourself!"});
    if (result[0].battery < 7) return res.render("menu/hack-player-id-error", {error:"Insufficient battery!"});
    if (result[0].currentFirewall <= 0) return res.render("menu/hack-player-id-error", {error:"You need a firewall to be able to hack other players!"})
    if (result[1].gracePeriod === true) return res.render("menu/hack-player-id-error", {error:"The person is under the influence of graceperiod (which last for up to 12 hours)"});
    if (result[1].currentFirewall <= 0) return res.render("menu/hack-player-id-error", {error:"You can't kill what's already dead!"})
    if (result[1].rank < (result[0].rank)/2) return res.render("menu/hack-player-id-error", {error:"You can't hack players that are lower than half of your rank"})
    let resultHack = result[0].hackPlayer(result[1]);
    res.render("menu/hack-player-id", { result: JSON.stringify(resultHack) });
  });
});

router.get("/hack/wanted-list", ensureAuthenticated, (req, res, next) => {
  User.find({})
    .then(users => {
      let bountyUsers = users.filter((user) => user.bounty > 0)
      console.log(bountyUsers)
        res.render("menu/hack-wanted-list", { bountyUsers });
    })
    .catch(console.error);
});

router.get("/alliance/forum", ensureAuthenticated, (req, res, next) => {
  res.render("menu/alliance-forum");
});

router.get("/alliance/group-kill", ensureAuthenticated, (req, res, next) => {
  res.render("menu/alliance-group-kill");
});

router.get("/alliance/hideout", ensureAuthenticated, (req, res, next) => {
  res.render("menu/alliance-hideout");
});

router.get("/marketplace", ensureAuthenticated, (req,res, next) => {
  Item.find()
    .then(items => {
      res.render("menu/marketplace", {
        items,
        cpuItems: items.filter(i => i.type === "cpu"),
        firewallItems: items.filter(i => i.type === "firewall"),
        avsItems: items.filter(i => i.type === "avs"),
        encryptionItems: items.filter(i => i.type === "encryption")
      });
    })
    .catch(error => {
      console.log(error);
    });
});

// BUYING ITEMS IN THE MARKETPLACE?
/* User.findByIdAndUpdate(id, { $set: { cpu: +=5  THIS WONT WORK probably   }}, function (err, user) {
  if (err) return handleError(err);
  res.send(user);
});
 */

router.get("/system-repair", ensureAuthenticated, (req, res, next) => {
  res.render("menu/system-repair");
});

router.get("/user/details", (req,res, next) => {
    res.json(req.user)
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

router.get("/events", (req, res, next) => {
  res.render("menu/events");
});

router.get("/arcade", (req, res, next) => {
  res.render("menu/arcade");
});

router.get("/logout", (req, res, next) => {
  res.render("menu/logout");
});

router.post("/upload", (req, res) => {
  console.log(req.files);
  res.send("we got the file");
});

module.exports = router;

//NOTES:

// Crime.findById(req.params.id).then(result => {
//   crimeToCommit = result;
// res.render("menu/hack-crimes-id", {
//   result: JSON.stringify(crimeToCommit)
// });
// });

// TODO get the user from req.user
// get the crime from db
// do the actual fight: let result = fight()
// render the result page with the result

//   res.render("menu/hack-crimes", {
//     result: JSON.stringify({ rounds: [{dodged: true}], won: true})
//   })
// })