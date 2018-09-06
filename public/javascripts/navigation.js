//TODO
// ALLIANCE FROM OTHER DOCUMENT
// SHORTEN DOWN BATTERY TO BTRY?
// MAKE "EVENT" BIGGER
// CREATE REMAINING EXP?
// ENSURE data.rankName IS RESPONSIVE WITH data.rank

$(document).ready(function() {
  axios
    .get("/user/details")
    .then(function(response) {
      console.log(response)
      $("#nav-username").text(response.data.name);
      $("#nav-userrank").text(response.data.rankName);
      $("#nav-userbitcoins").text(response.data.bitCoins + "$");
      $("#nav-userbattery").text("BATTERY: " + response.data.battery + "%");
      $("#nav-userfirewall").text(
        "FW: " +
          Math.floor(
            (response.data.currentFirewall * 100) / response.data.maxFirewall
          ) +
          "%"
      );
      $("#nav-userexp").text("EXP: " + response.data.exp + "/" + response.data.expToLevel);

      if(!response.data) [
        $("#navbar").hide()
      ]
    })
    .catch(function(error) {
      console.log(error);
    });
});
