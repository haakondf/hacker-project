console.log("Combat-stuff");
console.log(result);
let index = 0;
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
  "Breaking into Pentagon...1"
];
let errorEncryptionText = "ERROR: Problem detected, have to solve encryption";
let errorEncryptionDots =
  "....................................................... 4";
let successCombatLogText =
  "Hack successful!! <br><br><div class='success'>You gained:<br>100 exp<br> 50 bitcoins<br>-5% battery</div>";

function fight(result, index) {
  if (result.rounds[index] === "dodge") {
    let splitStrFour = errorEncryptionDots.split("");
    document.getElementById("writing").innerHTML +=
      "<br><br><div id='red-error-text'>" + errorEncryptionText + "</div>";
    index += 1;
    return combatLog(splitStrFour, result, index);
  } else if (result.rounds[index] === "hit") {
    let randomComment = Math.floor(Math.random() * randomCrimeString.length);
    let splitStrOne = randomCrimeString[randomComment].split("");
    document.getElementById("writing").innerHTML += "<br>";
    index += 1;
    return combatLog(splitStrOne, result, index);
  }
}
if (result.won === false) {
  setTimeout(() => {
    return combatFailed();
  }, 1500);
} else if (result.won === true) {
  setTimeout(function() {
    return combatFinished();
  }, 1000);
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

//Combat log

function combatLog(array, result, index) {
  if (array.length !== 1) {
    if (array[array.length - 1] == "1") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        return combatLog(array, result, index);
      }, 6);
    } else if (array[array.length - 1] == "4") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        return combatLog(array, result, index);
      }, 30);
    }
  } else {
    // document.getElementById("loading-bar").style.width =
    //   100 - (opponent.hp / opponent.maxHp) * 100 + "%";
    return fight(result, index);
  }
}

//Finish Combat

function combatFinished(result) {
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
    document.getElementById("writing").innerHTML +=
      "<br><br><a href='/home' class='level-up-text'>Congratulations, you have gained a new rank!</a>";
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

fight(result, index);
