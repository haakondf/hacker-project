var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Crime = require("../models/Crime");
const Alliance = require("../models/Alliance");
const Item = require("../models/Item");
const Rank = require("../models/Rank");
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
    res.redirect("/auth/sign-in");
  }
}

// TODO add isSetup to user model, defautls to false
// TODO maybe log req.user to see what the object is and if we have the value for isSetup
function ensureIsSetup(req, res, next) {
  if (req.user.isSetup()) {
    return next();
  } else {
    res.redirect("/create-hacker");
  }
}

router.get("/create-hacker", ensureAuthenticated, (req, res, next) => {
  if(req.user.isSetup) return res.redirect("/")
  // ensure user is logged in
  res.render("create-hacker", { title: "Express", statPoints: req.user.statPoints });
});

//upload photo
// router.post("/upload-photo", uploadCloud.single("photo"), (req, res, next) => {
//   const imgPath = req.file.url;
//   const imgName = req.file.originalname;
//   User.findByIdAndUpdate(req.user._id, { imgPath, imgName }).then((result) => {
//     console.log(result)
//   })
//   .catch(error => {
//     console.log(error);
//     res.redirect("error");

//   })
// })

router.post("/create-hacker", uploadCloud.single("photo"), (req, res, next) => {
  if(req.user.isSetup) return res.redirect("/")

  if(!req.body.name) {
    User.findById(req.user._id).then(result => {
      if(result.statPoints <= 0 ) return res.redirect("/create-hacker")

      result.statPoints -= 1;
      if (req.body.firewall) {
        result.maxFirewall += 5;
        result.currentFirewall += 5;
      } else if (req.body.cpu) {
        result.cpu += 2;
      } else if (req.body.antivirus) {
        result.antiVirus += 1;
      } else if (req.body.encryption) {
        result.encryption += 2;
      }

      return result.save()
    }).then(updatedUser => {
      res.redirect("/create-hacker")
    })
  } else {
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
  
    User.findByIdAndUpdate(req.user._id, {
      imgPath,
      imgName,
      isSetup: true,
      name: req.body.name
    }).then(() => {
      res.redirect("/my-profile")
    }).catch(error => {
      console.log(error);
      res.redirect("error");
    });
  }

});

router.get("/", (req, res, next) => {
  if (req.user) {
    res.redirect("/my-profile");
  } else {
    res.render("homeinfo");
  }
});

router.get("/my-profile", ensureAuthenticated, (req, res, next) => {
  let createdAtDate;
  let userIdThing;
  let cpu;
  let firewall;
  let antivirus;
  let encryption;
  User.findById(req.user._id).then(result => {
    userIdThing = result;
    createdAtDate = result.createdAt.toString().substring(4, 15);
    return Item.findById(userIdThing.items.cpu).then(resultTwo => {
      if (resultTwo) {
        cpu = resultTwo.name;
      }
      return Item.findById(userIdThing.items.firewall).then(resultThree => {
        if (resultThree) {
          firewall = resultThree.name;
        }
        return Item.findById(userIdThing.items.avs).then(resultFour => {
          if (resultFour) {
            avs = resultFour.name;
          }
          return Item.findById(userIdThing.items.encryption).then(resultFive => {
            if (resultFive) {
              encryption = resultFive.name;
            }
            return res.render("menu/my-profile", {
              user: userIdThing,
              createdAtDate,
              cpu,
              firewall,
              avs,
              encryption
            });
          });
        });
      });
    });
  });
});

router.post("/my-profile", ensureAuthenticated, (req, res, next) => {
  let statUpgrade = Object.keys(req.body);
  User.findById(req.user._id).then(result => {
    let createdAtDate = result.createdAt.toString().substring(4, 15);
    if (result.statPoints < 1)
      return res.render("menu/my-profile", {
        message: "You have no stat points. Obtain a higher rank to get more",
        user: result,
        createdAtDate
      });
    result.statPoints -= 1;
    if (statUpgrade[0] === "firewall") {
      result.maxFirewall += 5;
      result.currentFirewall += 5;
    } else if (statUpgrade[0] === "cpu") {
      result.cpu += 2;
    } else if (statUpgrade[0] === "antivirus") {
      result.antiVirus += 1;
    } else if (statUpgrade[0] === "encryption") {
      result.encryption += 2;
    }
    result.save();
    return res.render("menu/my-profile", {
      message: "You enhanced your " + statUpgrade[0],
      user: result,
      createdAtDate
    });
  });
});

router.get("/hack/crimes", ensureAuthenticated, (req, res, next) => {
  let internetTroll;
  let internetScam;
  let idTheft;
  let ddos;
  let logicBomb;
  Crime.find({}).then(result => {
    result.map(x => {
      if (x.name == "Internet Troll") {
        internetTroll = x._id;
      } else if (x.name == "Internet Scam") {
        internetScam = x._id;
      } else if (x.name == "ID Theft") {
        idTheft = x._id;
      } else if (x.name == "DDOS") {
        ddos = x._id;
      } else if (x.name == "Logic Bomb") {
        logicBomb = x._id;
      }
    });
    res.render("menu/hack-crimes", {
      internetTroll,
      internetScam,
      idTheft,
      ddos,
      logicBomb
    });
  });
});

router.get("/hack/crimes/:id", (req, res, next) => {
  let userIdThing = User.findById(req.user._id);
  let crimeIdThing = Crime.findById(req.params.id);

  Promise.all([userIdThing, crimeIdThing]).then(result => {
    if (result[0].battery < 7)
      return res.render("menu/hack-crimes-id-error", {
        error: "Insufficient battery!"
      });
    if (result[0].currentFirewall <= 0)
      return res.render("menu/hack-crimes-id-error", {
        error: "You need a firewall to be able to commit crimes!"
      });
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
    if (result[0].name === result[1].name)
      return res.render("menu/hack-player-id-error", {
        error: "You can't hack yourself!"
      });
    if (result[0].battery < 7)
      return res.render("menu/hack-player-id-error", {
        error: "Insufficient battery!"
      });
    if (result[0].currentFirewall <= 0)
      return res.render("menu/hack-player-id-error", {
        error: "You need a firewall to be able to hack other players!"
      });
    if (result[1].gracePeriod === true)
      return res.render("menu/hack-player-id-error", {
        error:
          "The person is under the influence of graceperiod (which last for up to 2 hours)"
      });
    if (result[1].currentFirewall <= 0)
      return res.render("menu/hack-player-id-error", {
        error: "You can't kill what's already dead!"
      });
    if (result[1].rank < result[0].rank / 2)
      return res.render("menu/hack-player-id-error", {
        error: "You can't hack players that are lower than half of your rank"
      });
    let resultHack = result[0].hackPlayer(result[1]);
    res.render("menu/hack-player-id", { result: JSON.stringify(resultHack) });
  });
});

router.get("/hack/wanted-list", ensureAuthenticated, (req, res, next) => {
  User.find({})
    .then(users => {
      let bountyUsers = users.filter(user => user.bounty > 0);
      res.render("menu/hack-wanted-list", { bountyUsers });
    })
    .catch(console.error);
});

router.post("/hack/wanted-list", ensureAuthenticated, (req, res, next) => {
  let namePlayer = req.body.name;
  let bountyPlayer = req.body.bounty;
  const findUser = User.findById(req.user._id);
  const findTarget = User.findOne({ name: namePlayer });
  Promise.all([findUser, findTarget]).then(result => {
    if (!result[1]) return res.send("No player is named: " + namePlayer);
    if (result[0].bitCoins < bountyPlayer)
      return res.send("You dont have that many bitcoins!");
    result[1].bounty += parseInt(bountyPlayer);
    result[0].bitCoins -= parseInt(bountyPlayer);
    result[0].save();
    result[1].save();
    res.redirect("/hack/wanted-list");
  });
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

router.get("/marketplace", ensureAuthenticated, (req, res, next) => {
  console.log(req.user.items);
  Item.find()
    .sort({
      type: 1,
      bonus: 1
    })
    .then(items => {
      // TODO highlight the items you already have (hint map items, if you that item from the list has the same id (item._id.toString() === req.user.items[item.type].toString()) --> set item.owned: true)
      res.render("menu/marketplace", {
        items,
        cpuItems: items.filter(i => i.type === "cpu"),
        firewallItems: items.filter(i => i.type === "firewall"),
        avsItems: items.filter(i => i.type === "avs"),
        encryptionItems: items.filter(i => i.type === "encryption"),
        newItemName: req.query.newItemName,
        existingItemName: req.query.existingItemName,
        insufficentBitcoins: req.query.insufficentBitcoins
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/marketplace/:itemId", (req, res) => {
  let item, user;
  Item.findById(req.params.itemId)
    .then(i => {
      item = i;
      return User.findById(req.user._id);
    })
    .then(u => {
      user = u
    if (user.bitCoins < item.price) {
        res.redirect("/marketplace?insufficentBitcoins=" + item.name);
        return null;
      } 
      user.bitCoins -= item.price;
      return user.addItem(item);
    })
    .then(updatedUser => {
      res.redirect("/marketplace?newItemName=" + item.name);
    });
});


router.get("/system-repair", ensureAuthenticated, (req, res, next) => {
  res.render("menu/system-repair");
});
router.get("/repair/partial", ensureAuthenticated, (req, res, next) => {
  let userPerson = req.user._id;
  if (userPerson.bitCoins < 10000) {
    return res.render("menu/system-repair", { message: "Insufficient funds" });
  } else if (userPerson.currentFirewall === userPerson.maxFirewall) {
    return res.render("menu/system-repair", {
      message: "Your computer is already working just fine!"
    });
  }
  User.findById(userPerson).then(result => {
    result.partialRepair();
    res.render("menu/system-repair", {
      message:
        "You successfully glued together some loose parts from your computer"
    });
  });
});

router.get("/repair/full", ensureAuthenticated, (req, res, next) => {
  let userPerson = req.user._id;
  if (userPerson.bitCoins < 50000) {
    return res.render("menu/system-repair", { message: "Insufficient funds" });
  } else if (userPerson.currentFirewall === userPerson.maxFirewall) {
    return res.render("menu/system-repair", {
      message: "Your computer is already working just fine!"
    });
  }
  User.findById(userPerson).then(result => {
    if (result.bitCoins < 50000) {
      res.render("menu/system-repair", { message: "Insufficient funds" });
    }
    result.systemFullRepair();
    res.render("menu/system-repair", {
      message: "The kittens successfully repaired your crappy computer"
    });
  });
});

router.get("/user/details", (req, res, next) => {
  res.json(req.user);
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

router.get("/arcade/squirt-derby", (req, res, next) => {
  res.sendfile("arcade/squirt-derby/index.html");
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
//     result: JSON.stringify({ rounds: [{encryptiond: true}], won: true})
//   })
// })
