var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Crime = require("../models/Crime");
const Alliance = require("../models/Alliance");
const Item = require("../models/Item");
const Rank = require("../models/Rank");
const uploadCloud = require("../utils/cloudinary.js");
const Forum = require("../models/forum")

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

function ensureIsSetup(req, res, next) {
  if (req.user.isSetup()) {
    return next();
  } else {
    res.redirect("/create-hacker");
  }
}

router.get("/create-hacker", ensureAuthenticated, (req, res, next) => {
  if (req.user.isSetup) return res.redirect("/");
  // ensure user is logged in
  res.render("create-hacker", {
    title: "Express",
    statPoints: req.user.statPoints
  });
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
  if (req.user.isSetup) return res.redirect("/");

  if (!req.body.name) {
    User.findById(req.user._id)
      .then(result => {
        if (result.statPoints <= 0) return res.redirect("/create-hacker");

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

        return result.save();
      })
      .then(updatedUser => {
        res.redirect("/create-hacker");
      });
  } else {
    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    User.findByIdAndUpdate(req.user._id, {
      imgPath,
      imgName,
      isSetup: true,
      name: req.body.name
    })
      .then(() => {
        res.redirect("/my-profile");
      })
      .catch(error => {
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
  let antiVirus;
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
          return Item.findById(userIdThing.items.encryption).then(
            resultFive => {
              if (resultFive) {
                encryption = resultFive.name;
              }
              return res.render("menu/my-profile", {
                user: userIdThing,
                createdAtDate,
                cpu,
                firewall,
                antiVirus,
                encryption
              });
            }
          );
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
    // if (result[1].rank < result[0].rank / 2)
    //   return res.render("menu/hack-player-id-error", {
    //     error: "You can't hack players that are lower than half of your rank"
    //   });
    let resultHack = result[0].hackPlayer(result[1]);
    res.render("menu/hack-player-id", { result: JSON.stringify(resultHack) });
  });
});

router.get("/hack/wanted-list", ensureAuthenticated, (req, res, next) => {
  User.find({})
    .then(users => {
      let bountyUsers = users.filter(user => user.bounty > 0);
      bountyUsers.sort(function (a,b) {
        return b.bounty - a.bounty
      })
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
  Forum.find({}).then((result) => {
    res.render("menu/alliance-forum", {result});
  })
});

router.post("/alliance/forum", ensureAuthenticated, (req, res, next) => {
    let comment = req.body.comment;
    let username;
    let dateNow = new Date()
    console.log(dateNow)
    User.findById(req.user._id).then((result) => {
      username = result.name;
      console.log(username)
      const newMessage = Forum({
        user: username,
        post: comment,
        date: dateNow,
      })
      newMessage.save()
      return Forum.find({}).then((result) => {
        res.render("menu/alliance-forum", {result});
      })
    })
})

router.get("/alliance/group-kill", ensureAuthenticated, (req, res, next) => {
  res.render("menu/alliance-group-kill");
});

router.get("/modelcreate123", ensureAuthenticated, (req, res, next) => {
  const newCrimeOne = Crime({
    name: "Internet Troll",
    difficulty: 1,
    encryption: 10,
    currentFirewall: 140,
    maxFirewall: 140
  });
  newCrimeOne.save();

  const newCrimeTwo = Crime({
    name: "Internet Scam",
    difficulty: 2.5,
    encryption: 20,
    currentFirewall: 200,
    maxFirewall: 200
  });
  newCrimeTwo.save();

  const newCrimeThree = Crime({
    name: "ID Theft",
    difficulty: 5,
    encryption: 30,
    currentFirewall: 300,
    maxFirewall: 300
  });
  newCrimeThree.save();

  const newCrimeFour = Crime({
    name: "DDOS",
    difficulty: 10,
    encryption: 50,
    currentFirewall: 400,
    maxFirewall: 400
  });
  newCrimeFour.save();

  const newCrime = Crime({
    name: "Logic Bomb",
    difficulty: 15,
    encryption: 60,
    currentFirewall: 700,
    maxFirewall: 700
  });
  newCrime.save();

  //Alliance
  //Alliance
  //ALLIANCES WHITE HATS & BLACK HATS:

  const newAllianceWhite = Alliance({
    name: "White hats",
    hideoutStrength: 1,
    members: Array
  });
  newAllianceWhite.save();

  const newAllianceBlack = Alliance({
    name: "Black hats",
    hideoutStrength: 1,
    members: Array
  });
  newAllianceBlack.save();

  //User
  //User

  // ITEMS
  // ITEMS

  //CPU items:
  //CPU items:
  const newItemOne = Item({
    name: "Intel celeron G3930",
    type: "cpu",
    price: 15000,
    bonus: 3
  });
  newItemOne.save();

  const newItemTwo = Item({
    name: "Intel i3-8350K",
    type: "cpu",
    price: 50000,
    bonus: 10
  });
  newItemTwo.save();

  const newItemThree = Item({
    name: "AMD Ryzen Threaddripper 1950X",
    type: "cpu",
    price: 120000,
    bonus: 20
  });
  newItemThree.save();

  const newItemFour = Item({
    name: "Intel i9-7980 xe",
    type: "cpu",
    price: 300000,
    bonus: 50
  });
  newItemFour.save();

  const newItemFive = Item({
    name: "Intel Xeon Platinum 8180",
    type: "cpu",
    price: 1000000,
    bonus: 100
  });
  newItemFive.save();

  // FIREWALL ITEMS
  // FIREWALL ITEMS
  const newItemSix = Item({
    name: "A lighter and a can of fuel",
    type: "firewall",
    price: 15000,
    bonus: 3
  });
  newItemSix.save();

  const newItemSeven = Item({
    name: "Linksys VPN router",
    type: "firewall",
    price: 50000,
    bonus: 10
  });
  newItemSeven.save();

  const newItemEight = Item({
    name: "Zyxel ZYWALL110",
    type: "firewall",
    price: 120000,
    bonus: 20
  });
  newItemEight.save();

  const newItemNine = Item({
    name: "Zyxel USG1100 UTM BDL",
    type: "firewall",
    price: 300000,
    bonus: 50
  });
  newItemNine.save();

  const newItemTen = Item({
    name: "Cisco PIX 500",
    type: "firewall",
    price: 1000000,
    bonus: 100
  });
  newItemTen.save();

  // Anti Virus Software (AVS) items
  // Anti Virus Software (AVS) items
  const newItemEleven = Item({
    name: "Windows defender",
    type: "avs",
    price: 15000,
    bonus: 3
  });
  newItemEleven.save();

  const newItemTwelve = Item({
    name: "McAfee",
    type: "avs",
    price: 50000,
    bonus: 10
  });
  newItemTwelve.save();

  const newItemThirteen = Item({
    name: "Norton Antivirus",
    type: "avs",
    price: 120000,
    bonus: 20
  });
  newItemThirteen.save();

  const newItemFourteen = Item({
    name: "AVG",
    type: "avs",
    price: 300000,
    bonus: 50
  });
  newItemFourteen.save();

  const newItemFifteen = Item({
    name: "Avast Business Pro",
    type: "avs",
    price: 1000000,
    bonus: 100
  });
  newItemFifteen.save();

  // ENCRYPTION ITEMS
  // ENCRYPTION ITEMS
  const newItemSixteen = Item({
    name: "Enigma machine",
    type: "encryption",
    price: 15000,
    bonus: 3
  });
  newItemSixteen.save();

  const newItemSeventeen = Item({
    name: "Bcrypt npm node",
    type: "encryption",
    price: 50000,
    bonus: 5
  });
  newItemSeventeen.save();

  const newItemEighteen = Item({
    name: "IVeraCrypt",
    type: "encryption",
    price: 120000,
    bonus: 7
  });
  newItemEighteen.save();

  const newItemNineteen = Item({
    name: "CertainSafe",
    type: "encryption",
    price: 300000,
    bonus: 10
  });
  newItemNineteen.save();

  const newItemTwenty = Item({
    name: "Vernam Cipher",
    type: "encryption",
    price: 1000000,
    bonus: 15
  });
  newItemTwenty.save();

  // Ranks
  const newRankOne = Rank({
    name: "Script Kiddie",
    rank: 0,
    expToNewRank: 10000
  });
  newRankOne.save();

  const newRankTwo = Rank({
    name: "Family IT-Support",
    rank: 1,
    expToNewRank: 25000
  });
  newRankTwo.save();

  const newRankThree = Rank({
    name: "Blog Writer",
    rank: 2,
    expToNewRank: 45000
  });
  newRankThree.save();

  const newRankFour = Rank({
    name: "HTML 'programmer'",
    rank: 3,
    expToNewRank: 70000
  });
  newRankFour.save();

  const newRankFive = Rank({
    name: "Jr. Web Dev",
    rank: 4,
    expToNewRank: 100000
  });
  newRankFive.save();

  const newRankSix = Rank({
    name: "Sr. Web Dev",
    rank: 5,
    expToNewRank: 140000
  });
  newRankSix.save();

  const newRankSeven = Rank({
    name: "System Dev",
    rank: 6,
    expToNewRank: 200000
  });
  newRankSeven.save();

  const newRankEight = Rank({
    name: "Cyber Security Dev",
    rank: 7,
    expToNewRank: 300000
  });
  newRankEight.save();

  const newRankNine = Rank({
    name: "Basement Dweller",
    rank: 8,
    expToNewRank: 500000
  });
  newRankNine.save();

  const newRankTen = Rank({
    name: "Anonymous",
    rank: 9,
    expToNewRank: 9999999999999
  });
  newRankTen.save();
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
      user = u;
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
  console.log(userPerson.currentFirewall)
  User.findById(userPerson).then(result => {
    if (result.bitCoins < 3000) {
      return res.render("menu/system-repair", { message: "Insufficient funds" });
    } else if (result.currentFirewall === result.maxFirewall) {
      return res.render("menu/system-repair", {
        message: "Your computer is already working just fine!"
      });
    }
    result.partialRepair();
    res.render("menu/system-repair", {
      message:
        "You successfully glued together some loose parts from your computer"
    });
  });
});

router.get("/repair/full", ensureAuthenticated, (req, res, next) => {
  let userPerson = req.user._id;
  User.findById(userPerson).then(result => {
    if (result.bitCoins < 12000) {
      return res.render("menu/system-repair", { message: "Insufficient funds" });
    } else if (result.currentFirewall === result.maxFirewall) {
      return res.render("menu/system-repair", {
        message: "Your computer is already working just fine!"
      });
    }
    if (result.bitCoins < 12000) {
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
      user.sort(function (a,b){
        return b.networth - a.networth
      })
      console.log(user)
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

const newCrimeOne = Crime({
  name: "Internet Troll",
  difficulty: 1,
  encryption: 10,
  currentFirewall: 140,
  maxFirewall: 140,
})
newCrimeOne.save();

const newCrimeTwo = Crime({
  name: "Internet Scam",
  difficulty: 2.5,
  encryption: 20,
  currentFirewall: 200,
  maxFirewall: 200,
})
newCrimeTwo.save()

const newCrimeThree = Crime({
  name: "ID Theft",
  difficulty: 5,
  encryption: 30,
  currentFirewall: 300,
  maxFirewall: 300,
})
newCrimeThree.save()

const newCrimeFour = Crime({
  name: "DDOS",
  difficulty: 10,
  encryption: 50,
  currentFirewall: 400,
  maxFirewall: 400,
})
newCrimeFour.save()

const newCrime = Crime({
  name: "Logic Bomb",
  difficulty: 15,
  encryption: 60,
  currentFirewall: 700,
  maxFirewall: 700,
})
newCrime.save()


//Alliance
//Alliance
//ALLIANCES WHITE HATS & BLACK HATS:

const newAllianceWhite = Alliance({
  name: "White hats",
  hideoutStrength: 1,
  members: Array,
})
newAllianceWhite.save();

const newAllianceBlack = Alliance({
  name: "Black hats",
  hideoutStrength: 1,
  members: Array,
})
newAllianceBlack.save();

//User
//User



// ITEMS
// ITEMS

//CPU items:
//CPU items:
const newItemOne = Item({
  name: "Intel celeron G3930",
  type: "cpu",
  price: 15000,
  bonus: 3,
})
newItemOne.save();

const newItemTwo = Item({
  name: "Intel i3-8350K",
  type: "cpu",
  price: 50000,
  bonus: 10,
})
newItemTwo.save();

const newItemThree = Item({
  name: "AMD Ryzen Threaddripper 1950X",
  type: "cpu",
  price: 120000,
  bonus: 20,
})
newItemThree.save();

const newItemFour = Item({
  name: "Intel i9-7980 xe",
  type: "cpu",
  price: 300000,
  bonus: 50,
})
newItemFour.save();

const newItemFive = Item({
  name: "Intel Xeon Platinum 8180",
  type: "cpu",
  price: 1000000,
  bonus: 100,
})
newItemFive.save();

// FIREWALL ITEMS
// FIREWALL ITEMS
const newItemSix = Item({
  name: "A lighter and a can of fuel",
  type: "firewall",
  price: 15000,
  bonus: 3,
})
newItemSix.save();

const newItemSeven = Item({
  name: "Linksys VPN router",
  type: "firewall",
  price: 50000,
  bonus: 10,
})
newItemSeven.save();

const newItemEight = Item({
  name: "Zyxel ZYWALL110",
  type: "firewall",
  price: 120000,
  bonus: 20,
})
newItemEight.save();

const newItemNine = Item({
  name: "Zyxel USG1100 UTM BDL",
  type: "firewall",
  price: 300000,
  bonus: 50,
})
newItemNine.save();

const newItemTen = Item({
  name: "Cisco PIX 500",
  type: "firewall",
  price: 1000000,
  bonus: 100,
})
newItemTen.save();

// Anti Virus Software (AVS) items
// Anti Virus Software (AVS) items
const newItemEleven = Item({
  name: "Windows defender",
  type: "avs",
  price: 15000,
  bonus: 3,
})
newItemEleven.save();

const newItemTwelve = Item({
  name: "McAfee",
  type: "avs",
  price: 50000,
  bonus: 10,
})
newItemTwelve.save();

const newItemThirteen = Item({
  name: "Norton Antivirus",
  type: "avs",
  price: 120000,
  bonus: 20,
})
newItemThirteen.save();

const newItemFourteen = Item({
  name: "AVG",
  type: "avs",
  price: 300000,
  bonus: 50,
})
newItemFourteen.save();

const newItemFifteen = Item({
  name: "Avast Business Pro",
  type: "avs",
  price: 1000000,
  bonus: 100,
})
newItemFifteen.save();

// ENCRYPTION ITEMS
// ENCRYPTION ITEMS
const newItemSixteen = Item({
  name: "Enigma machine",
  type: "encryption",
  price: 15000,
  bonus: 3,
})
newItemSixteen.save();

const newItemSeventeen = Item({
  name: "Bcrypt npm node",
  type: "encryption",
  price: 50000,
  bonus: 5,
})
newItemSeventeen.save();

const newItemEighteen = Item({
  name: "IVeraCrypt",
  type: "encryption",
  price: 120000,
  bonus: 7,
})
newItemEighteen.save();

const newItemNineteen = Item({
  name: "CertainSafe",
  type: "encryption",
  price: 300000,
  bonus: 10,
})
newItemNineteen.save();

const newItemTwenty = Item({
  name: "Vernam Cipher",
  type: "encryption",
  price: 1000000,
  bonus: 15,
})
newItemTwenty.save();


// Ranks
const newRankOne = Rank({
  name: "Script Kiddie",
  rank: 0,
  expToNewRank: 10000
})
newRankOne.save();

const newRankTwo = Rank({
  name: "Family IT-Support",
  rank: 1,
  expToNewRank: 25000,
})
newRankTwo.save();

const newRankThree = Rank({
  name: "Blog Writer",
  rank: 2,
  expToNewRank: 45000
})
newRankThree.save();

const newRankFour = Rank({
  name: "HTML 'programmer'",
  rank: 3,
  expToNewRank: 70000
})
newRankFour.save();

const newRankFive = Rank({
  name: "Jr. Web Dev",
  rank: 4,
  expToNewRank: 100000
})
newRankFive.save();

const newRankSix = Rank({
  name: "Sr. Web Dev",
  rank: 5,
  expToNewRank: 140000
})
newRankSix.save();

const newRankSeven = Rank({
  name: "System Dev",
  rank: 6,
  expToNewRank: 200000
})
newRankSeven.save();

const newRankEight = Rank({
  name: "Cyber Security Dev",
  rank: 7,
  expToNewRank: 300000
})
newRankEight.save();

const newRankNine = Rank({
  name: "Basement Dweller",
  rank: 8,
  expToNewRank: 500000
})
newRankNine.save();

const newRankTen = Rank({
  name: "Anonymous",
  rank: 9,
  expToNewRank: 9999999999999
})
newRankTen.save();






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
