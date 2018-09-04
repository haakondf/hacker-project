console.log("Combat-stuff");
console.log(result)
// console.log(result)
const Crime = function(name, dodge, hp, maxHp, difficulty) {
  this.name = name;
  this.dodge = dodge;
  this.hp = hp;
  this.maxHp = maxHp;
  this.difficulty = difficulty;
};

const Player = function(name, str, dodge, hp, maxHp) {
  this.name = name;
  this.str = str;
  this.dodge = dodge;
  this.hp = hp;
  this.maxHp = maxHp;
  this.battery = 100;
  this.exp = 0;
  this.crimeSkill = 0;
  this.money = 0;
  this.failedAttempts = 0;
  this.expToLevel = 10;
  this.networth = 0;
  this.fightCrime = function(opponent) {
    this.battery -= opponent.difficulty * 4 + 2;
    this.failedAttempts = 0;
    fight(this, opponent);
  };
  this.fightAnotherPlayer = function(opponent) {
      fightPlayer(this, opponent);
  }
};

const playerOne = new Player("Markus", 20, 15, 200, 200);
const playerTwo = new Crime("Google", 20, 200, 200, 1.5);


//Combat Crime

let randomCrimeString = [
    "Selling fake nudes for bitcoins.1",
    "Using your webdev skills to create a fake Paypal website.1",
    "Claiming to be a nigerian prince.1",
    "Asking your facebook friends for their password.1",
    "Impersonate as the perfect girl on Tinder, asking guys for funds.1",
    "Tricking eldery people to give their credit card information.1",
    "Attaching keylogger malware to your emails.1",
    "Setting up a fake fundraiser.1",
    "Trying to log in to others bank account by trial and error.1",
    "Setting up a bitcoin-mining-app in the background of your text-based MMORPG...1",
    "Shutting down Irans nuclear program.1",
    "Fetching personal data from Ashley Madison dating website.1",
    "Observing Home Depots trancsaction through the US...1",
    "Rebooting the Melissa Virus...1",
    "Breaking into Sony Playstation...1",
    "Stealing login credentials to Mt. Gox Bitcoin exchange...1",
    "Spreading Wannacry ransomware...1",
    "Stealing personal information from Equifax...1",
    "Breaking into Pentagon...1",
]
let errorEncryptionText = "ERROR: Problem detected, have to solve encryption";
let errorEncryptionDots =
  "....................................................... 4";
let successCombatLogText =
  "Hack successful!! <br><br><div class='success'>You gained:<br>100 exp<br> 50 bitcoins<br>-5% battery</div>";

function fight(player, opponent) {
  let dodgeOcc = Math.random() * (opponent.dodge / player.dodge);
  if (player.failedAttempts === 4) {
      setTimeout(() => {
          return combatFailed(player, opponent);
      }, 1500)
  } else if (player.hp <= 0 || opponent.hp <= 0) {
    setTimeout(
      function() {
        return combatFinished(player, opponent);
      }.bind(player),
      1000
    );
  } else if (dodgeOcc >= 1) {
    player.failedAttempts += 1;
    let splitStrFour = errorEncryptionDots.split("");
    document.getElementById("writing").innerHTML +=
      "<br><br><div id='red-error-text'>" + errorEncryptionText + "</div>";
    return combatLog(splitStrFour, player, opponent);
  } else {
    let randomComment = Math.floor(
      Math.random() * randomCrimeString.length
    );
    opponent.hp -= player.str;
    let splitStrOne = randomCrimeString[randomComment].split("");
    document.getElementById("writing").innerHTML += "<br>";
    console.log(opponent.hp);
    return combatLog(splitStrOne, player, opponent);
  }
}


//Combat Players

let randomCombatLogComments = [
    "Accessing files... struct ip_config_file_uploader = function(password) {console.log(debug_report); return ip}...1",
    "Rehosting server to accesspoint... Function denied, relocating host point to ip...1",
    "Ip config. 15.345.1.508 annihilating system software extras and extracting new data to disc. Reallocating new Malware to system disc.1",
    "Typescript system activated and transferred to new directory encrypted with an IBAN number of 19029839.1",
    "Console logging that bitch to see if there is an end_result: var type_in_user = {aku += 10} to user: 'Some_basement_guy'. Response awaiting...1",
    "Searching the depths of web to solve an algorithm by applying the known map, filter => reduce technique.1",
    "Deploying repository and git commit -m 'Advanced Update': Functioning: 1002.10002. 333 updated!1",
    "Userinterface activated by struct ip_hbs_active = resolution => return array[1223, 9532, 2846]. Looking for new updates to system-ware and hiking.1",
    "Constructing a VPN to server: 100%, connecting through active_flow_chart123 and deploying mechanism... Active and responsive!1",
    "Advanced css => upload ??? and activating decomposition to resolve Promise sent by FBI.1",
    "Git push origin_encrypted_secret master. Activating git pull request... Waiting for server to respond... Access granted on specific terms1",
    "Origin base requested from server: 1.119.1337.923. Accepted!1",
    "101010111010100011111010010010010101010101010101001011 01010110101010101010010101110101010100101010011001",
    "Running around the house trying to find the battery charger, but it failed to commit... System reboots: external_battery_source = True1"
  ];

  function fightPlayer(player, opponent) {
    let dodgeOcc = Math.random() * (opponent.dodge / player.dodge);
    if (player.failedAttempts === 4) {
        setTimeout(() => {
            return combatFailed(player, opponent);
        }, 1500)
    } else if (player.hp <= 0 || opponent.hp <= 0) {
      setTimeout(
        function() {
          return combatFinished(player, opponent);
        }.bind(player),
        1000
      );
    } else if (dodgeOcc >= 1) {
      player.failedAttempts += 1;
      let splitStrFour = errorEncryptionDots.split("");
      document.getElementById("writing").innerHTML +=
        "<br><br><div id='red-error-text'>" + errorEncryptionText + "</div>";
      return combatLog(splitStrFour, player, opponent);
    } else {
      let randomComment = Math.floor(
        Math.random() * randomCombatLogComments.length
      );
      opponent.hp -= player.str;
      let splitStrOne = randomCombatLogComments[randomComment].split("");
      document.getElementById("writing").innerHTML += "<br>";
      console.log(opponent.hp);
      return combatLog(splitStrOne, player, opponent);
    }
  }


//Combat log

function combatLog(array, player, opponent) {
  if (array.length !== 1) {
    if (array[array.length - 1] == "1") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        combatLog(array, player, opponent);
      }, 6);
    } else if (array[array.length - 1] == "4") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        combatLog(array, player, opponent);
      }, 30);
    }
  } else {
    if (opponent.hp < 0) opponent.hp = 0;
    document.getElementById("loading-bar").style.width =
      100 - (opponent.hp / opponent.maxHp) * 100 + "%";
    return fight(player, opponent);
  }
}


//Finish Combat

function combatFinished(player, opponent) {
  let batteryChange = opponent.difficulty * 4 + 2;
  let moneyChange =
    Math.floor(Math.random() * (opponent.difficulty * 1000)) +
    opponent.difficulty * 500;
  let expChange =
    Math.floor(Math.random() * 300) + opponent.difficulty * 100 + 100;
  let crimeChange = Math.floor(Math.random() * opponent.difficulty) + 1;
  player.money += moneyChange;
  player.networth += moneyChange;
  player.exp += expChange;
  player.crimeSkill += crimeChange;
  if (player.crimeSkill > 1000) player.crimeSkill = 1000;
  document.getElementById("writing").innerHTML +=
    "<br><br><br>" +
    "Hack successful!! <br><br><br><br><div class='success'>You gained:<br><br>" +
    expChange +
    " exp<br>" +
    moneyChange +
    " bitcoins<br>" +
    crimeChange +
    " crimeskill<br>-" +
    batteryChange +
    "% battery</div>";
    if (player.exp >= player.expToLevel) {
        document.getElementById("writing").innerHTML += "<br><br><a href='/home' class='level-up-text'>Congratulations, you have gained a new rank!</a>"
    }
  return; // player.save();
}

function combatFailed(player, opponent) {
  let batteryChange = opponent.difficulty * 8 + 2;
  player.battery -= opponent.difficulty * 4;
  document.getElementById("writing").innerHTML +=
    "<br><br><br>" +
    "Hack failure! Your internet was compromised by the Police CyberForce 2000...<br><br><br><br><div class='failure'>You lost:<br>" +
    batteryChange +
    "% battery</div>";
}

playerOne.fightCrime(playerTwo);