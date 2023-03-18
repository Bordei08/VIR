const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");


async function loginVerf() {

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        let xhr = new XMLHttpRequest();

        // open() method to pass request
        // type, url and async true/false
        xhr.open('POST',
            'http://localhost:8021/api/login', true);

        // Setting content-type
        xhr.getResponseHeader('Content-type', 'application/json');

        // Perform the following when the response is ready
        xhr.onload = function () {
            if (this.status === 200) {
                console.log(this.responseText);
                var resultGet;
                httpGetAsync(`http://localhost:8021/api/id/${username}`, function (res) {
                    // console.log(res);
                    resultGet = res.toString();
                    var id = resultGet.split('"')[3];
                    setCookie('userLogin', id, 0);
                    window.location = "../html/after_login.html";
                });
            }
            else {
                loginErrorMsg.style.opacity = 1;
                console.log("Some error occurred");
                loginErrorMsg.style.opacity = 1;
            }
        }

        // Send the request as an object obj
        var obj = new Object();
        obj.username = username;
        obj.password = password;
        var jsonString = JSON.stringify(obj);
        xhr.send(jsonString);
    })
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

loginVerf()

