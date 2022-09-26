var DataTypes = require("sequelize").DataTypes;
var _blogs = require("./blogs");
var _user = require("./user");

function initModels(sequelize) {
  var blogs = _blogs(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    blogs,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
