/**
 * Modulo que faz o controle das Tasks
 */

module.exports = (sequelize, DataType) => {
    const Tasks = sequelize.define("Tasks", {
        id : {
            type : DataType.INTEGER,
            primaryKey : true,
            autoIncremet : true
        },
        title : {
            type : DataType.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        done : {
            type : DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        classMethods : {
            associate : (models) => {
                Tasks.belongsTo(models.Users);
            }
        }
    });

    return Tasks;

}
