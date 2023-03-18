const loginForm = document.getElementById("register-form");
const loginButton = document.getElementById("register-form-submit");
const loginErrorMsg = document.getElementById("register-error-msg");

async function registerVerf() {

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        const email = loginForm.email.value;

        var flag = 0;
        if (!username || !password || !email) {
            loginErrorMsg.style.opacity = 1;
            console.log("Some error occurred");
            flag = 1;
        }

        if (verfUsername(username) == 'false')
            flag = 1;
        if (verfPassword(password) == 'false')
            flag = 1;
        if (verfEmail(email) == 'false')
            flag = 1;

        if (!username || !password || !email) {
            loginErrorMsg.style.opacity = 1;
            console.log("Some error occurred");
        }

        if (flag == 0) {
            let xhr = new XMLHttpRequest();

            // open() method to pass request
            // type, url and async true/false
            xhr.open('POST',
                'http://localhost:8021/api/register', true);

            // Setting content-type
            xhr.getResponseHeader('Content-type', 'application/json');

            // Perform the following when the response is ready
            xhr.onload = function () {
                if (this.status === 201) {
                    console.log(this.responseText);
                    window.location = "../html/login.html";
                }
                else {
                    loginErrorMsg.style.opacity = 1;
                    console.log("Some error occurred");

                }
            }

            // Send the request as an object obj
            var obj = new Object();
            obj.username = username;
            obj.email = email;
            obj.password = password;
            var jsonString = JSON.stringify(obj);
            xhr.send(jsonString);
        }
        else {
            loginErrorMsg.style.opacity = 1;
        }
    })
}


registerVerf();


function verfEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return 'true';
    }
    return 'false';
}

function verfPassword(password) {
    let text = password.toString();
    if (text.length < 8)
        return 'false';
    return 'true';

}

function verfUsername(username) {
    let text = username.toString();
    if (text.length < 8)
        return 'false';
    return 'true';


}