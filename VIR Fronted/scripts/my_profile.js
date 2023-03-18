var cookie = document.cookie;
let reviews = document.querySelector('.review-list')
let htmlCode = ``;

var jsonModel = `
{
   "username" : "usernameUser",
   "email" : "emailUser"
}`;

console.log(cookie);
console.log(readCookie('userLogin'));

httpGetAsync(`http://localhost:8021/api/username_email/${readCookie('userLogin')}`, function (res) {


    /* var jsonP = jsonModel.toString();
     var username = jsonP.split('"')[3];
     var email = jsonP.split('"')[7];
     document.getElementById("infoUser").innerHTML = `<h2>username : ${username} </h2>`;
     document.getElementById("infoUser").innerHTML += `<h2>Email : ${email} </h2>`;
    */
    var jsonP = res.toString();
    var username = jsonP.split('"')[3];
    console.log(username);
    var email = jsonP.split('"')[7];
     document.querySelector(".infoUserName").innerHTML = `<h3>${username} </h3>`;
     document.querySelector("#input-username").value = username;
     document.querySelector("#input-email").value = email;
    //document.getElementById("infoUser").innerHTML += `<h2>Email : ${email} </h2>`;input-email
    var jsonRes = res.toString();
    console.log(jsonRes);
});


async function getUserReviews() {
    const username = readCookie('userLogin');
    httpGetAsync(`http://localhost:8021/api/review_user/${username}`, function (res) {
        if (res == 'false') {
            console.log("closeDiv();");
        }
        else {
            console.log("the reviews of the user are")
            res = JSON.parse(res);
            console.log(res)
           res.map((element) =>{

           let html = '';
                html = html + `
                <div className="productBox row prod p-3 mb-auto rounded">
                    <div className="row">
                        <div className=" col-sm-8 px-1">
                            <p className="m-b-10 f-w-600"><b>Id video: ${element.id_video}  </b></p>
                        </div>
                        <div className="col-sm-2 px-1">
                            <p className="m-b-10 f-w-600"><b>Review: ${element.review} </b></p>
                        </div>
                    </div>
                    <hr/>
                </div>`
               reviews.innerHTML += html;  
           }) 
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
  
  getUserReviews();


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

async function httpGetAsync(theUrl, result) {
    var xmlHttp = new XMLHttpRequest();
    var result;
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            result(xmlHttp.responseText)
        }

    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);

}