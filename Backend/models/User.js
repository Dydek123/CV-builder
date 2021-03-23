const Sequelize = require('sequelize');
const db = require('../config/config');

const User = db.define('user', {
    id_user: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    id_details: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
        defaultValue: 1,
    },
    login: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Entered email is not unique',
        },
        validate: {
            isEmail: {
                msg: 'Please enter valid email',
            },
        }
    }
},{
    tableName: 'user',
    timestamps:false,
});

User.findByLogin = async login =>{
    return await User.findOne({
        where: {login},
    });
}

User.checkLogin = async (login, password) => {
    return await User.findOne({
        where: {
            login, password
        }
    })
}

module.exports = User;