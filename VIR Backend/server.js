const http = require('http')
const oracledb = require('oracledb');
const { getResultRegister, getResultLogin, getIdUserBy, getUsernameBy, getUsernameAndEmailBy } = require('./controllers/userController');
const { getCategoryAll } = require('./controllers/categoryController');
const { getVideoAllBy, getVideoIdBy, getAllVideoByCategory, getResultTop, getResultUpdateVideo } = require('./controllers/videoController');
const { getResultRemoveLike, getResultCreateLike, getResultLikeUser } = require('./controllers/likeController');
const { getResultCreateReview, getResultReviewVideo, getResultReviewUser } = require('./controllers/reviewController');
const { getResultCreateFeedback } = require('./controllers/feedbackController');
const { getUser } = require('./controllers/userController')

const server = http.createServer((req, res) => {
    var username;
    var password;
    var email;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    if (req.url.match(/\/api\/login/) && req.method === 'POST') {

        getResultLogin(req, res)

    }
    else if (req.url.match(/\/api\/register/) && req.method === 'POST') {

        getResultRegister(req, res)
    }
    else if (req.url.match(/\/api\/id\/\w+/) && req.method === 'GET') {
        const username = req.url.split('/')[3];
        getIdUserBy(req, res, username)
    }
    else if (req.url.match(/\/api\/username\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getUsernameBy(req, res, id);
    }
    else if (req.url.match(/\/api\/username_email\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];

        getUsernameAndEmailBy(req, res, id);
    }
    else if (req.url.match(/\/api\/category/) && req.method === 'GET') {
        getCategoryAll(req, res);
    }
    else if (req.url.match(/\/api\/video_id\/\w+/) && req.method === 'GET') {
        var name = req.url.split('/')[3];
        const nameVideo = name.replaceAll('_', ' ');
        getVideoIdBy(req, res, nameVideo);
    }
    else if (req.url.match(/\/api\/video\/\w+/) && req.method === 'GET') {
        var id = req.url.split('/')[3];
        getVideoAllBy(req, res, id);
    }
    else if (req.url.match(/\/api\/videos_category\/\w+/) && req.method === 'GET') {
        var category = req.url.split('/')[3];
        const nameCategory = category.replaceAll('_', ' ');
        getAllVideoByCategory(req, res, nameCategory);
    }
    else if (req.url.match(/\/api\/like/) && req.method === 'POST') {
        getResultCreateLike(req, res);
    }
    else if (req.url.match(/\/api\/feedback/) && req.method === 'POST') {
        getResultCreateFeedback(req, res);
    }
    else if (req.url.match(/\/api\/review/) && req.method === 'POST') {
        getResultCreateReview(req, res);
    }
    else if (req.url.match(/\/api\/like\/\w+\/\w+/) && req.method === 'DELETE') {
        var idUser = req.url.split('/')[3];
        var idVideo = req.url.split('/')[4];
        getResultRemoveLike(req, res, idUser, idVideo);
    }
    else if (req.url.match(/\/api\/review_video\/\w+/) && req.method === 'GET') {
        var idVideo = req.url.split('/')[3];
        getResultReviewVideo(req, res, idVideo);

    }
    else if (req.url.match(/\/api\/review_user\/\w+/) && req.method === 'GET') {
        var idUser = req.url.split('/')[3];
        getResultReviewUser(req, res, idUser);

    }
    else if (req.url.match(/\/api\/like_video\/\w+/) && req.method === 'GET') {
        var idUser = req.url.split('/')[3];
        getResultLikeUser(req, res, idUser)

    }
    else if (req.url.match(/\/api\/top/) && req.method === 'GET') {

        getResultTop(req, res);
    }
    else if (req.url.match(/\/api\/video_update/) && req.method === 'PUT') {
        getResultUpdateVideo(req, res);
    }
    else {

        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }


})

const PORT = 8021

server.listen(PORT, () => console.log(`Server running on Port : ${PORT}`))


