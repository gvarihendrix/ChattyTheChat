
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log(name);
  res.render('partials/' + name);
};


/**
 * Get about page
 */

exports.about = function (req, res){
    console.log(req);
    res.render('about');
};