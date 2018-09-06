console.log("system-repair");

// 15% repair
function partialRepair(player) {
  if (player.money <= 10000) {
  } else if ((player.hp * 100) / player.maxHp > 85) {
    player.money -= 10000;
    player.hp = player.maxHp;
  } else {
    player.money -= 10000;
    player.hp += (15 * player.maxHp) / 100;
  }
}

// Full repair

function systemRepairFull(player) {
  if (player.money <= 50000) {
  } else {
    player.money -= 50000;
    player.hp = player.maxHp;
  }
}
