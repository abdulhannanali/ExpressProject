var project = require("../controllers/project.controller");
var Router = require("express").Router();

Router.route ("/").get(project.getProjectsIndex);

module.exports = Router;
