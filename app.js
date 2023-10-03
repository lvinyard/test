
fetch("Text.txt")
  .then((res) => res.text())
  .then((text) => {
    // Split the text into an array of lines
    var lines = text.split('\n');

    // Get the <ul> element by its ID
    var ul = document.getElementById("myUL");

    // Iterate over the lines and create <li> elements with anchor elements
    lines.forEach((line) => {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#'; // Set the link URL here if needed
      a.appendChild(document.createTextNode(line));
      li.appendChild(a);
      ul.appendChild(li);
    });
  })
  .catch((e) => console.error(e));


ul = document.querySelector('.myUL');
ul.addEventListener("click", movieSelect);

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  ul.style.display = "";
  console.log(input)
  
  if(filter.length == 0){
    ul.style["visibility"] = "hidden";
    document.getElementById("movieRecommendations").innerHTML = "";

    console.log(filter.length);
  }
  else{
      // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      ul.style["visibility"] = "";
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }

  }

}

function movieSelect(event) {

    var selectMovie = event.target.innerHTML;
    var url = "http://143.110.236.155/" + selectMovie
    var movieList = document.getElementById("movieRecommendations");

    document.getElementById('accordion').innerHTML = "";
    myFunction()

    ul = document.getElementById("myUL");
    ul.style.display = "none";

    document.getElementById('myInput').value = selectMovie
    console.log("You selected " + selectMovie + ".");

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        loadCards(data);

        /*
        for (var movie of data){

            console.log(movie.movieId);
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(movie.movieId));
            movieList.appendChild(li);
        }
        */

    })
    .catch(error => {
        // handle the error
        console.log(error)
    });

}

function loadCards(data){

  const container = document.getElementById('accordion');

  data.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'card-body';
  
    // Construct card content
    const content = `
      <div class="card text-white bg-dark mb-3">
      <div class="card-header" id="heading-${idx}">
      <div id="cardleft">
      <h3>${result.movieId}</h3>
      </div>
      <div id="cardright">
      <img class="card-img-top" style="max-width: 120px;" src="https://image.tmdb.org/t/p/original/${result.metadata.poster_path}" alt="Card image cap">
      </div>
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${idx}" aria-expanded="true" aria-controls="collapse-${idx}">
  
                  </button>
        </h5>
      </div>
  
      <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
        <div class="card-body">
  
          
          <hr/>
          <p>${result.metadata.overview}</p>
        </div>
      </div>
    </div>
    `;
  
    // Append newyly created card element to the container
    container.innerHTML += content;
  })
}

