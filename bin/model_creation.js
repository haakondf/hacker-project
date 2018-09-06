//Crime:
//Crime:

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
    name: "Syber Security Dev",
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





  