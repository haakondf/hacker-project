//Combat Crime
console.log("Combat-stuff")


//Combat log

function combatLog(array, id, opponent) {
    if (array.length !== 1) {
        if (array[array.length-1] == "1") {
           document.getElementById("writing").innerHTML += array.shift();
           setTimeout(() => {
               combatLog(array, id, opponent)
           }, 8)
        }
        if (array[array.length-1] == "4") {
            document.getElementById("writing").innerHTML += array.shift()
            setTimeout(() => {
                combatLog(array, id, opponent)
            }, 30)
        }
        if (array[array.length-1] == "5") {
          document.getElementById("writing").innerHTML += "<br><br><br>" + array.slice(0, array.length-1);
        return;
         }
    } else {
        document.getElementById("loading-bar").style.width = (100 - opponent.hp/opponent.maxHp * 100) + "%";
        console.log("hackhackhack")
        return id.fight(opponent)
    }   
}
