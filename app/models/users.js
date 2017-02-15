/**
 * Modulo que faz o controle dos Usuários
 */

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id : {
            type : DataType.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataType.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        password :{
            type : DataType.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        email : {
            type : DataType.STRING,
            allowNull : false,
            unique : true,
            validate : {
                notEmpty : true
            }
        }
    },{
        classMethods : {
            associate : (models) => {
                Users.hasMany(models.Tasks)
            }
        }
    });

    return Users;
}