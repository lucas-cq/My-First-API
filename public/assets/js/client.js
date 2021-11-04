//TODO: Fetch api and display info, use api assignment for ref
'use strict'

fetch(`CHANGE ME!!`)
  .then(function(response){
    if (!response.ok) {
      throw new Error('Not 200 OK');
    }
    return response.json();
  }) 

//forEach loop that applies to all images in the array
  .then(function(data){
    carPictures.forEach(function(carId){
    output += 
    `<figure class="img-box">
    <img class="gallery-img" src="${carId.pathURL}" alt="${carId.description}" width="${carId.width}" height="${carId.height}">
    <figcaption><em><a href="${carId.linkURL}">${carId.title}</a></em><br><a href="${carId.creditURL}">@${carId.credit} on Unsplash</a></figcaption>
    </figure>`});
  })

  .catch(function(err){
    console.log(err);
  });
  

// Selects the div, and outputs the forEach loop onto HTML
const gallery = document.querySelector('.wrapper');
gallery.innerHTML = output;