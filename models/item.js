const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    type: String,
    price: Number,
    bonus: Number,
});

module.exports = mongoose.model('Item', itemSchema);

// MARKETPLACE
//TODO:
// MAKE FUNCTION FOR BUYING ITEMS
// ONLY ONE ITEM PER CATEGORY
// BUYING NEW ITEM OVERRIDES CURRENT ITEM IF ANY
// BEST ITEMS SHOULD NOT BE OBTAINABLE THE FIRST WEEK?
// MARKETPLACE ITEMS. values are not final

//CPU items:
//CPU items:
const newItemOne = Item({
    name: "Intel celeron G3930",
    type: "cpu",
    price: 10000,
    bonus: 3,
  })
  newItemOne.save();

const newItemTwo = Item({
    name: "Intel I3-8350K",
    type: "cpu",
    price: 30000,
    bonus: 10,
  })
  newItemTwo.save();

const newItemThree = Item({
    name: "AMD Ryzen Threaddripper 1950X",
    type: "cpu",
    price: 80000,
    bonus: 20,
  })
  newItemThree.save();

const newItemFour = Item({
    name: "Intel i9-7980 xe",
    type: "cpu",
    price: 150000,
    bonus: 50,
  })
  newItemFour.save();

const newItemFive = Item({
    name: "Intel Xeon Platinum 8180",
    type: "cpu",
    price: 500000,
    bonus: 100,
  })
  newItemFive.save();

// FIREWALL ITEMS
// FIREWALL ITEMS
  const newItemSix = Item({
    name: "A lighter and a can of fuel",
    type: "firewall",
    price: 10000,
    bonus: 3,
  })
  newItemSix.save();

const newItemSeven = Item({
    name: "Linksys VPN router",
    type: "firewall",
    price: 30000,
    bonus: 10,
  })
  newItemSeven.save();

const newItemEight = Item({
    name: "Zyxel ZYWALL110",
    type: "firewall",
    price: 80000,
    bonus: 20,
  })
  newItemEight.save();

const newItemNine = Item({
    name: "Zyxel USG1100 UTM BDL",
    type: "firewall",
    price: 150000,
    bonus: 50,
  })
  newItemNine.save();

const newItemTen = Item({
    name: "Cisco PIX 500",
    type: "firewall",
    price: 500000,
    bonus: 100,
  })
  newItemTen.save();

// Anti Virus Software (AVS) items
// Anti Virus Software (AVS) items
  const newItemEleven = Item({
    name: "Windows defender",
    type: "avs",
    price: 10000,
    bonus: 3,
  })
  newItemEleven.save();

const newItemTwelve = Item({
    name: "McAfee",
    type: "avs",
    price: 30000,
    bonus: 10,
  })
  newItemTwelve.save();

const newItemThirteen = Item({
    name: "Norton Antivirus",
    type: "avs",
    price: 80000,
    bonus: 20,
  })
  newItemThirteen.save();

const newItemFourteen = Item({
    name: "AVG",
    type: "avs",
    price: 150000,
    bonus: 50,
  })
  newItemFourteen.save();

const newItemFifteen = Item({
    name: "Avast Business Pro",
    type: "avs",
    price: 500000,
    bonus: 100,
  })
  newItemFifteen.save();

// ENCRYPTION ITEMS
// ENCRYPTION ITEMS
  const newItemSixteen = Item({
    name: "Enigma machine",
    type: "encryption",
    price: 10000,
    bonus: 3,
  })
  newItemSixteen.save();

const newItemSeventeen = Item({
    name: "Bcrypt npm node",
    type: "encryption",
    price: 30000,
    bonus: 5,
  })
  newItemSeventeen.save();

const newItemEighteen = Item({
    name: "IVeraCrypt",
    type: "encryption",
    price: 80000,
    bonus: 7,
  })
  newItemEighteen.save();

const newItemNineteen = Item({
    name: "CertainSafe",
    type: "encryption",
    price: 150000,
    bonus: 10,
  })
  newItemNineteen.save();

const newItemTwenty = Item({
    name: "Vernam Cipher",
    type: "encryption",
    price: 500000,
    bonus: 15,
  })
  newItemTwenty.save();







/* let cpuItems = [
    {name: "Intel celeron G3930", price: 10000, bonus: 3},
    {name: "Intel I3-8350K", price: 30000, bonus: 10},
    {name: "AMD Ryzen Threaddripper 1950X", price: 80000, bonus: 20},
    {name: "Intel i9-7980 xe", price: 150000, bonus: 50},
    {name: "Intel Xeon Platinum 8180", price: 500000, bonus: 100},
] 

let firewallItems = [
    {name: "", price: 10000, bonus: 3},
    {name: "", price: 30000, bonus: 10},
    {name: "", price: 80000, bonus: 20},
    {name: "", price: 150000, bonus: 50},
    {name: "", price: 500000, bonus: 100},
]


let avsItems = [
    {name: "", price: 10000, bonus: 3},
    {name: "", price: 30000, bonus: 10},
    {name: "", price: 80000, bonus: 20},
    {name: "", price: 150000, bonus: 50},
    {name: "", price: 500000, bonus: 100},
] 
 
  let encryptionItems = [
    {name: "Enigma machine", price: 10000, bonus: 3},
    {name: "Bcrypt npm node", price: 30000, bonus: 5},
    {name: "VeraCrypt", price: 80000, bonus: 7},
    {name: "CertainSafe", price: 150000, bonus: 10},
    {name: "Vernam Cipher", price: 500000, bonus: 15},
]
 */