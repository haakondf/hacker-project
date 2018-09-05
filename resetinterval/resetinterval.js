const mongoose = require("mongoose");
const User = require("../models/User");


function resetInterval() {
    User.find({}).then((users) => {
        users.map((user) => {
            user.battery += 10;
            if (user.battery > 100) user.battery = 100;
            user.save();
        })
    })
}

module.exports = resetInterval;