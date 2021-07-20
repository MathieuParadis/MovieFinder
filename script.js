var key = 'f888450f';
// Uncaught ReferenceError:  is not defined

const showMovie = (selector, title, releaseDate, poster, imdbID) => {
  selector.innerHTML += `
    <div class='card-movie card col-8 mt-3'>
      <div class="poster-card">
        <span class="img-container">
          <img class="img-poster" width="120" height="160" src="${poster}">
        </span>
      </div>
      <div class="title-date">
        <h3 class="text-primary">${title}</h3>
        <h6>${releaseDate}</h6>
      </div>
      <div class="read-more">
        <button class="btn btn-primary btn-submit" id="${imdbID}" onclick="displayPopup(this.id)">Read more</button>
      </div>
    </div>
  `
  createObserver();
}

const showMoviePopup = (selector, title, releaseDate, plot, poster) => {
  selector.innerHTML = `
    <div class='card-movie-pop-up card col-8 mt-3'>
      <div class="poster-card">
        <span class="img-container">
          <img class="img-poster" width="100%" height="100%" src="${poster}">
        </span>
      </div>
      <div class="title-date-pop-up">
        <h3 class="text-primary">${title}</h3>
        <h6>${releaseDate}</h6>
        <h5 class="plot">${plot}</h5>
      </div>
    </div>
  `
}

function getInputValue() {
  const input = document.getElementById("myInput").value;
  return input
}

function searchMovie() {
  let userInput = getInputValue();
  const URL = `http://www.omdbapi.com/?s=${userInput}&apikey=${key}&s`;
  return URL
}

function getMovieList() {
  const URL = searchMovie();
  const result =  document.getElementById("result");
  result.innerHTML = '';

  fetch(URL, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      for (let i in response.Search) {
        getMovieDetails(response.Search[i].imdbID);
      }
    })
    .catch((error) => console.error(error));
}

function getMovieDetails(imdbID) {
  const URL = `http://www.omdbapi.com/?i=${imdbID}&apikey=${key}&s`;
  const result =  document.getElementById("result");

  fetch(URL, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      showMovie(result, response.Title.toUpperCase(), response.Released, response.Poster, imdbID)
    })
    .catch((error) => console.error(error));
}

function getMoviePopup(imdbID) {
  const URL = `http://www.omdbapi.com/?i=${imdbID}&apikey=${key}&s`;
  const modal = document.getElementById("myModal");

  fetch(URL, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      showMoviePopup(modal, response.Title.toUpperCase(), response.Released, response.Plot, response.Poster);
    })
    .catch((error) => console.error(error));
}

function displayPopup(id) {
  // Get the modal
  var modal = document.getElementById("myModal");
  

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close");


  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

    // Open the modal
    getMoviePopup(id)
    modal.style.display = "block";
}


// let observer = new IntersectionObserver(function (observables) {
//   // observables est un tableau contenant des IntersectionObserverEntry
//   console.log(observables)
// }, {

// });

// let items = document.querySelectorAll('.card-movie')
// items.forEach(function (item) {
//   observer.observe(item)
// })


// let observer = new IntersectionObserver(observables, options);

// let options = {
//   threshold: 0.8
// }

// let ob = (observables, observer) => {
//   observables.forEach(observable => {
//     if (observable.IntersectionRatio > 0.8) {
//       observable.target.style = "opacity: 1";
//     }
//   })
// }

// let items = document.querySelectorAll('.card-movie')
// items.forEach(function (item) {
//   observer.observe(item)
// })



const createObserver = () => {
  const showCard = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.8) entry.target.style = "opacity: 1";
    });
  };
  
  var options = {
    threshold: 0.8
  }

  var observer = new IntersectionObserver(showCard, options);
  
  var targets = document.querySelectorAll(`.card-movie`);
  targets.forEach(function (target) {
    observer.observe(target);
  })
};