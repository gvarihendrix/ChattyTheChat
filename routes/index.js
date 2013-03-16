
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log(name);
  res.render('partials/' + name);
};


/**
 * GET about page
 */

exports.about = function (req, res) {
    console.log(req);
    res.render('about');
};


/**
 * GET login page
 */

exports.login = function(req, res) {
    res.render('login');
};