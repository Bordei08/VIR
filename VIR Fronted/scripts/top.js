let htmlCode = ``;
const topCards = document.querySelector(".top-cards");

function addIdToStorage(id){
  //const id = document.querySelector(".object_id");
  console.log('id')
  console.log(id)
  localStorage.removeItem("id")
  localStorage.setItem("id", id)
}

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

function addToFavorites(id) {
  
    const username = readCookie('userLogin');

    let xhr = new XMLHttpRequest();

    // open() method to pass request
    // type, url and async true/false
    xhr.open('POST',
        'http://localhost:8021/api/like', true);

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
        id_user: username,
        id_video: id
    }
    //console.log(obj)

    var jsonString = JSON.stringify(obj);

    xhr.send(jsonString);
}

async function getTop() {
  httpGetAsync(`http://localhost:8021/api/top`, function (res) {
      if (res == 'false') {
          console.log("closeDiv();");
      }
      else {
          console.log("the top is")
          res = JSON.parse(res);
         // console.log(res)
          res.map((element) =>{
            console.log(element['id_video'])
            getVideo(element['id_video'], htmlCode)
            })
      }
  });
}

async function getVideo(id, htmlCode) {
  httpGetAsync(`http://localhost:8021/api/video/${id}`, function (res) {
      if (res == 'false') {
          console.log("error");
      }
      else {
          //console.log("the data of the video is")
          res = JSON.parse(res);
          //console.log(res) //${res.picture} img src
          let html = '';
          html =
            html +
            `
              <article class = "object_article">
                <a href = "../html/video_page.html" class = "video-link" onclick = "addIdToStorage(${res.id})" >
                  <div>
                  <img src="${res.picture}" alt="${
                    res.name}" class = "object_picture">
                  </div>
                  <div>
                    <h3 class = "object_title" >${res.name}</h3>
                    <p class = "object_id" >${res.id}</p>
                    <p class = "object_author">Posted by: ${res.posted_by}</p>
                    <p class = "object_length">Duration: ${res.duration}</p>
                    <p class = "object_views">Views: ${res.stats}</p>
                    <p class = "object_category">Category: ${res.category}</p>
                  </div>
                  </a>
                  <button style="font-size:24px" id = "favorites-btn" onClick = "addToFavorites(${res.id})">Add to favorites</button>
              </article>`;
              topCards.innerHTML += html;    
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

getTop();