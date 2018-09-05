

$(document).ready(function() {
axios.get('/user/details')
  .then(function (response) {
    console.log(response);
    $('#nav-username').text(response.data.name)
    $('#nav-userrank').text(response.data.rankName) // GIVES A NUMBER VALUE, NOT NAME OF RANK... YET
    $('#nav-useralliance').text(response.data.role) // THIS IS NOT CORRECT. GET FROM OTHER DOCUMENT
    $('#nav-userbitcoins').text(response.data.bitCoins + "$")
    $('#nav-userbattery').text("BTRY: "+response.data.battery + "%")
    $('#nav-userfirewall').text("FW: "+response.data.currentFirewall + "%")
    $('#nav-userexp').text(response.data.exp)// DOES NOT HAVE REMAINING EXP UNTIL NEXT LEVEL UP 

  })
  .catch(function (error) {
    console.log(error);
  })

});

