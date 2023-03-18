var cookie = document.cookie;

console.log(cookie);

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


httpGetAsync(`http://localhost:8021/api/username/${readCookie('userLogin')}`, function (res) {
    console.log(res);
    resultGet = res.toString();
    var username = resultGet.split('"')[3];
    document.getElementById("welcomeTitle").innerHTML += `<h1>Welcome ${username} </h1>`;

});




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

