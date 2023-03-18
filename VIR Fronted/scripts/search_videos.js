const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-form-submit");
const searchErrorMsg = document.getElementById("search-error-msg"); 
const category = document.querySelector(".filter-category");

category.addEventListener("click", () => {
        let category_select = document.querySelector('.select-category').value;
        
        console.log(category_select)
        
        localStorage.removeItem("category")
        localStorage.setItem("category", category_select)
        //go video page
        window.location = "../html/category.html";
});

var select = document.createElement( 'select' );
select.setAttribute('class', 'select-category');
var option;

option = document.createElement( 'option' );
option.value = option.textContent = "Choose a category";
option.setAttribute("selected", '');
option.setAttribute("disabled", '');
option.setAttribute("hidden", '');
select.appendChild( option );

function closeDiv(){
    searchErrorMsg.style.opacity = 0;
}

async function searchVerf() {
    console.log("Iniante de event");
    searchButton.addEventListener("click", (e) => {
        console.log("In event");
        e.preventDefault();
        const search = searchForm.search.value;
        const video = search.replaceAll(' ', '_');
        console.log(video);
        httpGetAsync(`http://localhost:8021/api/video_id/${video}`, function (res) {
            if (res == 'false') {
                searchErrorMsg.style.opacity = 1;
                window.setTimeout("closeDiv();", 5000);
            }
            else {
                console.log("the id of the video is")
                console.log(res);
                setCookie("video", res, 0);
                localStorage.removeItem("id")
                localStorage.setItem("id", res)
                //go video page
                window.location = "../html/video_page.html";
            }
        });

    })
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

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

httpGetAsync(`http://localhost:8021/api/category`, function (res) {
    var text;
    if (res == 'false') {

        text = jsonCategories.split(`"`)[3];
        
        option = document.createElement( 'option' );
        option.value = option.textContent = text;
        select.appendChild( option );

        text = jsonCategories.split(`"`)[7];
        console.log(text);

        option = document.createElement( 'option' );
        option.value = option.textContent = text;

        select.appendChild( option );

        // mai facem un cookie cu categoria dupa o sa se duca pe o pagina cu toate video urile din categoria aia, evident trebuie sa vedem ce buton a fost apasat
    }
    else {
        var jsonResult = res.toString();
        console.log(jsonResult);
        var text = jsonResult.split(`"`)[3];
        option = document.createElement( 'option' );
        option.value = option.textContent = text;
        select.appendChild( option );
        
        var i = 7;
        while (i < 36) {
            text = jsonResult.split(`"`)[i];
            option = document.createElement( 'option' );
            option.value = option.textContent = text;
            select.appendChild( option );
            i += 4;
        }

    }
});

searchVerf();

const categories = document.querySelector(".categories");
categories.appendChild(select);