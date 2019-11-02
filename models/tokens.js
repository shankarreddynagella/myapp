module.exports = function (sequelize, DataTypes) {
    var Tokens = sequelize.define("tokens", {
        token: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
           
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    })
    return Tokens;
};