// defining our variable to retrieve the html strings
// we asign an empty template string to htmlCode. We'll add something inside afterwards.
  let htmlCode = ``;
  
  // to get each single elephant object from the array and use them to build out html string, we need to open up our array, and we do that using forEach method. The forEach method, finds each item(object) in the array and returns them, this means we get 4 items that are objects back.
  
  likedVideos.forEach(function(singleObject) {
    // uncomment the line below, to see each of the 4 objects rendered in the console.
    //console.log(singleElephantObjects);
  
    // we take our previous empty htmlCode variable and add our html codes to it.
  
    // because the forEach method returns objects, we can then use the dot notation to reference children of the object, e.g, elephant.title;
    htmlCode =
      htmlCode +
      `
      <article class = "object_article">
        <div >
        <img src="${singleObject.pictureUrl}" alt="${
          singleObject.imageAlt
      }" class = "object_picture">
        </div>
        <div>
        <h3 class = "object_title" >Title: ${singleObject.title}</h3>
        <p class = "object_author">Posted by: ${singleObject.author}</p>
        <p class = "object_length">Length: ${singleObject.length}</p>
        <p class = "object_views">Views: ${singleObject.views}</p>
        </div>
      </article>
    `;
    // uncomment the line below to see the output in the browser console.
    // console.log(htmlCode);
  });
  
  // we are simply saying, "let elephantCards be = to that div", to target that div, we reference the class we gave to it.
  const elephantCards = document.querySelector(".liked-cards");
  
  elephantCards.innerHTML = htmlCode;
  