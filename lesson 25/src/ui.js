'use strict';

class UI {
  constructor() {
    this.output = document.getElementById('output');
  }
  

  showData(movies, genres) {
    const movieGenres = genres.join(', ');
    this.output.innerHTML += `
    <div class="row">
    <div class="four columns">
      <img class ="movie-backdrop" 
        src = 'http://image.tmdb.org/t/p/w300/${movies.poster_path}'></img>
    </div>
    <div class="eight columns">
      <h1 class="movie-title">${movies.title}</h1>      
      <p class="movie-overview">${movies.overview}</p>
      <p class="movie-genres">${movieGenres}</p>
      <span class="movie-release-data">Release date: ${movies.release_date}</span>
      <p class ="movie-rate">${movies.vote_average}</p>
    </div>
    </div>
    ` ;    
  }   
  
}

//export default UI;
