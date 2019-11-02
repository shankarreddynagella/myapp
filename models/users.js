module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("users", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
           
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    })
    return Users;
};