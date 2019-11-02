let fs = require('fs');
let path = require('path')
let Sequelize = require('sequelize');
var sequelize = new Sequelize('testdb', 'root', 'Incor@1234', {
    host: '142.93.211.146',
    dialect: 'mysql',
    port:3306,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
let db = {};
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
module.exports = db;
