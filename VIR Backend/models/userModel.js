const dataBase = require('../models/DBModule')
var resultDB;

async function findByUsernameAndPassword(username, password) {
    return dataBase.verfLogin(username, password);
}

async function create(username, email, password) {

    return dataBase.registerUser(username, email, password);

}


async function getId(username) {

    return new Promise((resolve, reject) => {
        var resultFunc = dataBase.getIdUser(username);
        resolve(resultFunc)
    })
}

async function getUsernameU(id) {

    return new Promise((resolve, reject) => {

        var resultFunc1 = dataBase.getUsernameDB(id);
        resolve(resultFunc1)
    })
}

async function getUsernameEmail(id) {

    return new Promise((resolve, reject) => {

        var resultFunc1 = dataBase.getUsernameAndEmailDB(id);
        resolve(resultFunc1)
    })
}




module.exports = {
    findByUsernameAndPassword,
    create,
    getId,
    getUsernameU,
    getUsernameEmail
}