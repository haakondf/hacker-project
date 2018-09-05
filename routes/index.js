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
  // ensure user is logged in
  res.render("create-hacker", { title: "Express" });
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
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  console.log("req user consolelog", req.user);
  //User.findById /// add { title, description, imgPath, imgName });
  // now isSetup is changed to true upon image upload. This should be changed to play/create button
  User.findByIdAndUpdate(req.user._id, {
    title,
    description,
    imgPath,
    imgName,
    isSetup: true
  }).catch(error => {
    console.log(error);
    res.redirect("error");
  });
});

router.get("/", (req, res, next) => {
  if (req.user) {
    res.render("menu/home");
  } else {
    res.render("homeinfo");
  }
});

router.get("/hack/crimes", ensureAuthenticated, (req, res, next) => {
  // TODO list all crimes with link to GET /hack/crimes/:id
  res.render("menu/hack-crimes");
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
      console.log(bountyUsers);
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

/* router.post("/marketplace/:itemId", (req, res) => {
  let item, user;
  Item.findById(req.params.itemId)
    .then(i => {
      item = i;
      return .UserfindById(req.user._id);
    }).then(u => {
      user = u;
    }).then(() => {
      if (user.bitcoin < item.price) {
        return res.send("Insufficent bitcoins")
        }
        let itemType = user.items.filter(item => item.type === item.type)
          else if (!itemType) {
            user.bitCoins -= item.price;
            user.items.push(item);
            if (item.type === "cpu") {
                user.cpu += item.bonus;
            } else if (item.type === "firewall") {
                  user.maxFirewall += item.bonus;
            } else if (item.type === "avs") {
                  user.antiVirus += item.bonus;
            } else if (item.type === "encryption") {
                  user.encryption += item.bonus;
            }
         } else 
      user.bitCoins -= item.price;
      let indexItem = user.items.indexOf(itemType);
      user.items.splice(indexItem, 1);
      user.items.push(item);
    })

    .then(u => {
      // TODO use the item to update the user
      // DOES NOT TAKE EXISTING ITEM INTO CONSIDERATION

      if (item.price > user.bitcoins) {
        console.log("insufficent funds..");
      } 
      return user.save();
    })
    .then(updatedUser => {
      // TODO render or redirect
      // JQUERY "YOU JUST BOUGHT item.name FOR item.price"
      res.send("you just bought an item!");
    });
}); */

router.get("/system-repair", ensureAuthenticated, (req, res, next) => {
  res.render("menu/system-repair");
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
  //Crime:
  //Crime:

  const newCrimeOne = Crime({
    name: "Internet Troll",
    difficulty: 1,
    encryption: 15,
    currentFirewall: 120,
    maxFirewall: 120
  });
  newCrimeOne.save();

  const newCrimeTwo = Crime({
    name: "Internet Scam",
    difficulty: 1.5,
    encryption: 20,
    currentFirewall: 200,
    maxFirewall: 200
  });
  newCrimeTwo.save();

  const newCrimeThree = Crime({
    name: "ID Theft",
    difficulty: 2.5,
    encryption: 30,
    currentFirewall: 300,
    maxFirewall: 300
  });
  newCrimeThree.save();

  const newCrimeFour = Crime({
    name: "DDOS",
    difficulty: 4,
    encryption: 50,
    currentFirewall: 400,
    maxFirewall: 400
  });
  newCrimeFour.save();

  const newCrime = Crime({
    name: "Logic Bomb",
    difficulty: 7,
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
    price: 10000,
    bonus: 3
  });
  newItemOne.save();

  const newItemTwo = Item({
    name: "Intel i3-8350K",
    type: "cpu",
    price: 30000,
    bonus: 10
  });
  newItemTwo.save();

  const newItemThree = Item({
    name: "AMD Ryzen Threaddripper 1950X",
    type: "cpu",
    price: 80000,
    bonus: 20
  });
  newItemThree.save();

  const newItemFour = Item({
    name: "Intel i9-7980 xe",
    type: "cpu",
    price: 150000,
    bonus: 50
  });
  newItemFour.save();

  const newItemFive = Item({
    name: "Intel Xeon Platinum 8180",
    type: "cpu",
    price: 500000,
    bonus: 100
  });
  newItemFive.save();

  // FIREWALL ITEMS
  // FIREWALL ITEMS
  const newItemSix = Item({
    name: "A lighter and a can of fuel",
    type: "firewall",
    price: 10000,
    bonus: 3
  });
  newItemSix.save();

  const newItemSeven = Item({
    name: "Linksys VPN router",
    type: "firewall",
    price: 30000,
    bonus: 10
  });
  newItemSeven.save();

  const newItemEight = Item({
    name: "Zyxel ZYWALL110",
    type: "firewall",
    price: 80000,
    bonus: 20
  });
  newItemEight.save();

  const newItemNine = Item({
    name: "Zyxel USG1100 UTM BDL",
    type: "firewall",
    price: 150000,
    bonus: 50
  });
  newItemNine.save();

  const newItemTen = Item({
    name: "Cisco PIX 500",
    type: "firewall",
    price: 500000,
    bonus: 100
  });
  newItemTen.save();

  // Anti Virus Software (AVS) items
  // Anti Virus Software (AVS) items
  const newItemEleven = Item({
    name: "Windows defender",
    type: "avs",
    price: 10000,
    bonus: 3
  });
  newItemEleven.save();

  const newItemTwelve = Item({
    name: "McAfee",
    type: "avs",
    price: 30000,
    bonus: 10
  });
  newItemTwelve.save();

  const newItemThirteen = Item({
    name: "Norton Antivirus",
    type: "avs",
    price: 80000,
    bonus: 20
  });
  newItemThirteen.save();

  const newItemFourteen = Item({
    name: "AVG",
    type: "avs",
    price: 150000,
    bonus: 50
  });
  newItemFourteen.save();

  const newItemFifteen = Item({
    name: "Avast Business Pro",
    type: "avs",
    price: 500000,
    bonus: 100
  });
  newItemFifteen.save();

  // ENCRYPTION ITEMS
  // ENCRYPTION ITEMS
  const newItemSixteen = Item({
    name: "Enigma machine",
    type: "encryption",
    price: 10000,
    bonus: 3
  });
  newItemSixteen.save();

  const newItemSeventeen = Item({
    name: "Bcrypt npm node",
    type: "encryption",
    price: 30000,
    bonus: 5
  });
  newItemSeventeen.save();

  const newItemEighteen = Item({
    name: "IVeraCrypt",
    type: "encryption",
    price: 80000,
    bonus: 7
  });
  newItemEighteen.save();

  const newItemNineteen = Item({
    name: "CertainSafe",
    type: "encryption",
    price: 150000,
    bonus: 10
  });
  newItemNineteen.save();

  const newItemTwenty = Item({
    name: "Vernam Cipher",
    type: "encryption",
    price: 500000,
    bonus: 15
  });
  newItemTwenty.save();
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
//     result: JSON.stringify({ rounds: [{encryptiond: true}], won: true})
//   })
// })
