const dataBase = require('../models/DBModule')


async function createLike(idUser, idVideo) {

    return dataBase.insertLike(idUser, idVideo);

}

async function removeLike(idUser, idVideo) {
    return dataBase.deleteLike(idUser, idVideo);
}

async function getLike(idUser, idVideo) {

    return new Promise((resolve, reject) => {
        var resultFunc = dataBase.existLike(idUser, idVideo);
        resolve(resultFunc)
    })
}

async function getLikeUser(idUser) {

    return new Promise((resolve, reject) => {
        var resultFunc = dataBase.getLikeUserDB(idUser);
        resolve(resultFunc)
    })
}


module.exports = {
    createLike,
    removeLike,
    getLike,
    getLikeUser
}