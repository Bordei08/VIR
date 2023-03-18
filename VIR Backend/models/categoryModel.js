const dataBase = require('../models/DBModule')

async function getCategory() {

    return new Promise((resolve, reject) => {

        var resultFunc1 = dataBase.getCategoryDB();
        resolve(resultFunc1)
    })
}

module.exports = {
    getCategory
}
