exports.render = function(req, res, next){
  res.render("index", {
    title: "Hello World",
    para: "I am Abdul Hannan Ali"
  });
};
