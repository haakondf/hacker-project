console.log("system-repair")


// 15% repair
function partialRepair (player){
    console.log("systemRepairQuick was called");
    console.log("NAME: " + player.name + " HP: " + (player.hp * 100 / player.maxHp).toFixed(2) + " Max HP: 100" + " Money: " + player.money + " Battery: " + player.battery + " EXP: " + player.exp + " Rank: " + player.rank + " Crimeskill: " + player.crimeSkill)
    if ( player.money <= 10000 ){ 
        console.log("insufficent funds") 
    } else if ( (player.hp * 100 / player.maxHp) > 85 ){
        player.money -= 10000;
        player.hp = player.maxHp 
    } else {
        player.money -= 10000;
        player.hp += (15 * player.maxHp / 100); 
    }
    console.log("NAME: " + player.name + " HP: " + (player.hp * 100 / player.maxHp).toFixed(2) + " Max HP: 100" + " Money: " + player.money + " Battery: " + player.battery + " EXP: " + player.exp + " Rank: " + player.rank + " Crimeskill: " + player.crimeSkill)
}


    // Full repair

    function systemRepairFull (player){
        console.log("systemRepairFull was called");
        console.log("NAME: " + player.name + " HP: " + (player.hp * 100 / player.maxHp).toFixed(2) + " Max HP: 100" + " Money: " + player.money + " Battery: " + player.battery + " EXP: " + player.exp + " Rank: " + player.rank + " Crimeskill: " + player.crimeSkill)
        if ( player.money <= 50000 ){ 
            console.log("insufficent funds")
        } else {
            player.money -= 50000;
            player.hp = player.maxHp;
        }
        console.log("NAME: " + player.name + " HP: " + (player.hp * 100 / player.maxHp).toFixed(2) + " Max HP: 100" + " Money: " + player.money + " Battery: " + player.battery + " EXP: " + player.exp + " Rank: " + player.rank + " Crimeskill: " + player.crimeSkill)
        }