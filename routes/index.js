var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get("/", (req,res, next) => {
  res.render("home")
})

module.exports = router;
