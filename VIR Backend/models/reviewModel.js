const dataBase = require('../models/DBModule')


async function createReview(idUser, idVideo, meg) {

    return dataBase.insertReview(idUser, idVideo, meg);

}

async function getReviewUser(idUser) {

    return new Promise((resolve, reject) => {
        var resultFunc = dataBase.getReviewUserDB(idUser);
        resolve(resultFunc)
    })
}

async function getReviewVideo(idVideo) {

    return new Promise((resolve, reject) => {
        var resultFunc = dataBase.getReviewVideoDB(idVideo);
        resolve(resultFunc)
    })
}


module.exports = {
    createReview,
    getReviewVideo,
    getReviewUser
}