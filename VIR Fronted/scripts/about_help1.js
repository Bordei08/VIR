const aboutForm = document.getElementById("about-form");
const aboutButton = document.getElementById("about-form-submit");
const emailInput = document.getElementById("emailInput");
const desInput = document.getElementById("desInput")

aboutButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const msg = desInput.value
    let xhr = new XMLHttpRequest();

    // open() method to pass request
    // type, url and async true/false
    xhr.open('POST',
        'http://localhost:8021/api/feedback', true);

    // Setting content-type
    xhr.getResponseHeader('Content-type', 'application/json');

    // Perform the following when the response is ready
    xhr.onload = function () {
        if (this.status === 201) {
            console.log(this.responseText);
            var resultGet;
        }
        else {

            console.log("Some error occurred");

        }
    }

    // Send the request as an object obj
    var obj = new Object();
    obj = {
        email: email,
        meg: msg
    }

    var jsonString = JSON.stringify(obj);

    xhr.send(jsonString);
})