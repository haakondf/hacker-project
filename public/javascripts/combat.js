console.log("Combat-stuff");
const Crime = function(name, dodge, hp, maxHp, difficulty) {
    this.name = name;
    this.dodge = dodge;
    this.hp = hp;
    this.maxHp = maxHp;
    this.difficulty = difficulty;
}

const Player = function(name, str, dodge, hp, maxHp)  {
    this.name = name;
    this.str = str;
    this.dodge = dodge;
    this.hp = hp;
    this.maxHp = maxHp;
    this.battery = 100;
    this.exp = 0;
    this.crimeSkill = 0;
    this.money = 0;
    this.fightCrime = function(opponent) {
        fight(this, opponent);
    }
}

const playerOne = new Player ("Markus", 20, 10, 200, 200)
const playerTwo = new Crime ("Google", 20, 120, 120, 1.5)

//Combat Crime

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
let errorEncryptionText = "ERROR: Problem detected, have to solve encryption";
let errorEncryptionDots = "....................................................... 4";
let successCombatLogText =
  "Hack successful!! <br><br><div class='success'>You gained:<br>100 exp<br> 50 bitcoins<br>-5% battery</div>5";

function fight (player, opponent) {
    let dodgeOcc = Math.random() * (opponent.dodge / player.dodge);
    if (player.hp <= 0 || opponent.hp <= 0) {
      setTimeout(
        function() {
          combatLog(successCombatLogText, player, opponent);
          console.log("FINISHED!");
          return combatFinished(player, opponent)
        }.bind(player),
        1000
      );
    } else if (dodgeOcc >= 1.5) {
      console.log("dodge");
      let splitStrFour = errorEncryptionDots.split("");
      document.getElementById("writing").innerHTML +=
        "<br><br><div id='red-error-text'>" + errorEncryptionText + "</div>";
      return combatLog(splitStrFour, player, opponent);
    } else {
      let randomComment = Math.floor(Math.random() * randomCombatLogComments.length);
      opponent.hp -= player.str;
      let splitStrOne = randomCombatLogComments[randomComment].split("");
      document.getElementById("writing").innerHTML += "<br>";
      console.log(opponent.hp);
      return combatLog(splitStrOne, player, opponent);
    }
  };


//Combat log

function combatLog(array, id, opponent) {
  if (array.length !== 1) {
    if (array[array.length - 1] == "1") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        combatLog(array, id, opponent);
      }, 8);
    } else if (array[array.length - 1] == "4") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        combatLog(array, id, opponent);
      }, 30);
    } else if (array[array.length - 1] == "5") {
      document.getElementById("writing").innerHTML +=
        "<br><br><br>" + array.slice(0, array.length - 1);
      return;
    }
  } else {
    document.getElementById("loading-bar").style.width =
      100 - (opponent.hp / opponent.maxHp) * 100 + "%";
    console.log("hackhackhack");
    return id.fightCrime(opponent);
  }
}

//Finish Combat

function combatFinished(player, opponent) {
    player.battery -= (opponent.difficulty * 4) + 2;
    player.money += Math.floor(Math.random() * (opponent.difficulty * 1000)) + (opponent.difficulty * 500);
    player.exp += Math.floor(Math.random() * 300) + (opponent.difficulty * 100) + 100;  
    player.crimeSkill += Math.floor(Math.random() * opponent.difficulty) + 1;
    if (player.crimeSkill > 500) return player.crimeSkill = 500;
}


playerOne.fightCrime(playerTwo)