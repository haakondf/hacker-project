let index = 0;
//Combat Player

let randomCrimeString = [
  "Accessing files... struct ip_config_file_uploader = function(password) {console.log(debug_report); return ip}...1",
  "setting up listener to external api-point by Overtaking Justice Under New Alias",
  "Rehosting server to accesspoint... Function denied, relocating host point to ip...1",
  "Ip config. 15.345.1.508 annihilating system software extras and extracting new data to disc. Reallocating new Malware to system disc.1",
  "Typescript system activated and transferred to new directory encrypted with an IBAN number of 19029839.1",
  "Console logging that sucker to see if there is an end_result: var type_in_user = {aku += 10} to user: 'Some_basement_guy'. Response awaiting...1",
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
let errorEncryptionDots =
  "....................................................... 4";

//Combat Players

function fight(result, index) {
  pageScroll();
  if (result.rounds[index] === "encryption") {
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
  if (result.won === false && result.rounds.length === index) {
    setTimeout(() => {
      return combatFailed(result);
    }, 1500);
  } else if (result.won === true && result.rounds.length === index) {
    setTimeout(function() {
      return combatFinished(result);
    }, 1000);
  }
}

//Combat log

function combatLog(array, result, index) {
  if (array.length !== 1) {
    if (array[array.length - 1] == "1") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        return combatLog(array, result, index);
      }, 7);
    } else if (array[array.length - 1] == "4") {
      document.getElementById("writing").innerHTML += array.shift();
      setTimeout(() => {
        return combatLog(array, result, index);
      }, 30);
    }
  } else {
    document.getElementById("loading-bar").style.width =
      100 - (result.currentHp[index] / result.maxHp) * 100 + "%";
    return fight(result, index);
  }
}

//Finish Combat

function combatFinished(result) {
  document.getElementById("writing").innerHTML +=
    "<br><br><br>" +
    "Hack successful!! <br><br><br><br><div class='success'>You gained:<br><br>" +
    result.gains.exp +
    " exp<br>" +
    result.gains.bitCoins +
    " bitcoins<br>" +
    result.gains.battery +
    "% battery</div>";
  if (result.gains.bounty > 0) {
    document.getElementById("writing").innerHTML +=
      "<br><div id='bounty'>You also recieved a bounty of $" +
      result.gains.bounty +
      "!</div>";
  }
  if (result.levelUp === true) {
    document.getElementById("writing").innerHTML +=
      "<br><br><a href='/my-profile' class='level-up-text'>Congratulations, you have gained a new rank!</a>";
  }
  return;
}

function combatFailed(result) {
  document.getElementById("writing").innerHTML +=
    "<br><br><br>" +
    "Hack failure! Your internet was compromised by the Police CyberForce 2000...<br><br><br><br><div class='failure'>You lost:<br>" +
    result.gains.battery +
    "% battery</div>";
}

function pageScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(pageScroll, 10);
}

fight(result, index);
