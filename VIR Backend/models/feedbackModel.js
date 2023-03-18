const dataBase = require('../models/DBModule')


async function createFeedBack(email, meg) {

    return dataBase.insertFeedBack(email, meg);

}


module.exports = {
    createFeedBack
}