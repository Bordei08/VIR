let id = localStorage.getItem("id");
let post_btn = document.querySelector('.post_review')
let reviews = document.querySelector('.comment-section')
let htmlCode = ``;

post_btn.addEventListener("click", (e) => {
    const username = readCookie('userLogin');
    const msg = document.querySelector('.take-msg').value;
    //console.log(msg)
    //console.log(username)
    //console.log(id)
    
    if(msg != undefined){
        let xhr = new XMLHttpRequest();

        // open() method to pass request
        // type, url and async true/false
        xhr.open('POST',
            'http://localhost:8021/api/review', true);
    
        // Setting content-type
        xhr.getResponseHeader('Content-type', 'application/json');
    
        // Perform the following when the response is ready
        xhr.onload = function () {
            if (this.status === 200) {
                console.log(this.responseText);//idUser, idVideo, review
                var resultGet;
                httpGetAsync(`http://localhost:8021/api/review`, function (res) {
                    // console.log(res);
                    resultGet = res.toString();
                    console.log(resultGet)
                });
            }
        }
    
        // Send the request as an object obj
        var obj = new Object();
        obj = {
            id_user: username,
            id_video: id,
            meg: msg
        }
        var jsonString = JSON.stringify(obj);
        xhr.send(jsonString);
    }
    window.location = "../html/video_page.html";
})

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

if(id.includes(":", 0)){
    id = id.split(':')[1];
    id = id.split('}')[0];
}
else console.log(id)

async function getVideo() {
        httpGetAsync(`http://localhost:8021/api/video/${id}`, function (res) {
            if (res == 'false') {
                console.log("closeDiv();");
            }
            else {
                console.log("the data of the video is")
                res = JSON.parse(res);
                console.log(res)
                const iframe = document.querySelector(".iframe_video");
                const author = document.querySelector(".author");
                const views = document.querySelector(".views");
                const category = document.querySelector(".category");
                const posted = document.querySelector(".posted");
                const title = document.querySelector(".movie__title");
                const duration = document.querySelector(".duration");
                const average_rating = document.querySelector(".average-based-on");

                average_rating.innerHTML = 'Rating ' + res['rating'] + ' based on ' + res['number_of_rating'] + ' ratings';
                title.innerHTML = res['name'];
                author.innerHTML += res['posted_by'];
                views.innerHTML += res['stats'];
                category.innerHTML += res['category'];
                posted.innerHTML += res['created_time'];
                duration.innerHTML +=res['duration'];
                res['embed'] = res['embed'].replaceAll('#', '\'')
                //console.log(res['embed']);
                iframe.innerHTML = res['embed'];
                //add posted by, etc in html with bold text
            }
        });
}

async function getReviews() {
    httpGetAsync(`http://localhost:8021/api/review_video/${id}`, function (res) {
        if (res == 'false') {
            console.log("closeDiv();");
        }
        else {
            console.log("the reviews of the video are")
            res = JSON.parse(res);
            console.log(res)
            res.map((element) =>{
                
                let html = '';
                html = html + `
                <div className="productBox row prod p-3 mb-auto rounded">
                    <div className="row">
                        <div className=" col-sm-8 px-1">
                            <p className="m-b-10 f-w-600"><b>Username:  ${element.id_user}</b></p>
                        </div>
                        <div className="col-sm-2 px-1">
                            <p className="m-b-10 f-w-600"><b>Review: ${element.review}</b></p>
                        </div>
                    </div>
                    <hr/>
                </div>`
                reviews.innerHTML += html;
                })

                
        }
    });
}

async function getVideo() {
    httpGetAsync(`http://localhost:8021/api/video/${id}`, function (res) {
        if (res == 'false') {
            console.log("closeDiv();");
        }
        else {
            console.log("the data of the video is")
            res = JSON.parse(res);
            console.log(res)
            const iframe = document.querySelector(".iframe_video");
            const author = document.querySelector(".author");
            const views = document.querySelector(".views");
            const category = document.querySelector(".category");
            const posted = document.querySelector(".posted");
            const title = document.querySelector(".movie__title");
            const duration = document.querySelector(".duration");
            const average_rating = document.querySelector(".average-based-on");

            average_rating.innerHTML = 'Rating ' + res['rating'] + ' based on ' + res['number_of_rating'] + ' ratings';
            title.innerHTML = res['name'];
            author.innerHTML += res['posted_by'];
            views.innerHTML += res['stats'];
            category.innerHTML += res['category'];
            posted.innerHTML += res['created_time'];
            duration.innerHTML +=res['duration'];
            res['embed'] = res['embed'].replaceAll('#', '\'')
            //console.log(res['embed']);
            iframe.innerHTML = res['embed'];
            //add posted by, etc in html with bold text
        }
    });
}

async function httpGetAsync(theUrl, result) {
    var xmlHttp = new XMLHttpRequest();
    var result;
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            result(xmlHttp.responseText)
        }
        else if (xmlHttp.status == 404) {
            result('false');
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

getVideo();
getReviews();