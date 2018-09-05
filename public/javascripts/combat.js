let index = 0;


//Combat Crime

let randomCrimeString = [
  "Selling fake nudes for bitcoins. Using the excessive money to buy hookers1",
  "Using your webdev skills to create a fake Paypal website.1",
  "Claiming to be a nigerian prince, and sends out a bunch of emails using advanced scripts...1",
  "Asking your facebook friends for their password.1",
  "Impersonate as the perfect girl on Tinder, asking guys for funds.1",
  "Tricking eldery people to give their credit card information.1",
  "Attaching keylogger malware to your emails.1",
  "Setting up a fake fundraiser, and asks grandmother to chip in a little extra1",
  "Trying to log in to others bank account by trial and error.1",
  "Setting up a bitcoin-mining-app in the background of your text-based MMORPG...1",
  "Shutting down Irans nuclear program.1",
  "Fetching personal data from Ashley Madison dating website.1",
  "Observing Home Depots trancsaction through the US...1",
  "Rebooting the Melissa Virus... It is super effective!1",
  "Breaking into Sony Playstation... Greeted by a lot of japanese people. This is nice..1",
  "Stealing login credentials to Mt. Gox Bitcoin exchange...1",
  "Spreading Wannacry ransomware... Login: Wanna_cry, Password: ran_some_where. Access granted!1",
  "Stealing personal information from Equifax...1",
  "Breaking into Pentagon and selling their software on ebay1",
  "Trading Chartreuse on the black market: A shady guy named mc100s is willing to sell it!1"
];
let errorEncryptionText = "ERROR: Problem detected, have to solve encryption";
let errorEncryptionDots =
  "....................................................... 4";

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
    result.gains.crime +
    " crimeskill<br>-" +
    result.gains.battery +
    "% battery</div>";
  if (result.gains.exp >= result.gains.expToLevel) {
    document.getElementById("writing").innerHTML +=
      "<br><br><a href='/home' class='level-up-text'>Congratulations, you have gained a new rank!</a>";
  }
  return
}

function combatFailed(result) {
  document.getElementById("writing").innerHTML +=
    "<br><br><br>" +
    "Hack failure! Your internet was compromised by the Police CyberForce 2000...<br><br><br><br><div class='failure'>You lost:<br>" +
    result.gains.battery +
    "% battery</div>";
}

fight(result, index);
