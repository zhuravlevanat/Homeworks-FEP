
class MovieDB {
  constructor() {
    this.urlNowPlayingMovie = `https://api.themoviedb.org/3/movie/now_playing?api_key=28ae3beaaffa9842263e6e671dfde8d0&language=en-US&page=`;
    this.urlPopularMovie = `https://api.themoviedb.org/3/movie/popular?api_key=28ae3beaaffa9842263e6e671dfde8d0&language=en-US&page=`;
    this.urlTopRatedMovie = `https://api.themoviedb.org/3/movie/top_rated?api_key=28ae3beaaffa9842263e6e671dfde8d0&language=en-US&page=`
    this.urlMovieGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=28ae3beaaffa9842263e6e671dfde8d0&language=en-US`
  }

  getUrl(url, page) {
    return `${url}${page}`;
  }  

  async getNowPlaying(page = 1) {   
    const url = this.getUrl(this.urlNowPlayingMovie, page);

    const response = await fetch(url);
    const responseObj = await response.json();
    const nowPlayingMovie = responseObj.results;
    
    return nowPlayingMovie
  }

  async getPopular(page = 1) {
    const url = this.getUrl(this.urlPopularMovie, page);

    const response = await fetch(url);
    const responseObj = await response.json();
    const popularMovie = responseObj.results;

    return popularMovie
    
  }

  async getTopRated(page = 1) {
    const url = this.getUrl(this.urlTopRatedMovie, page);

    const response = await fetch(url);
    const responseObj = await response.json();
    const topRatedMovie = responseObj.results;

    return topRatedMovie
  }

  async getMovieGenres() {
    const response = await fetch(this.urlMovieGenre);

    const responseObj = await response.json();
    const arrayOfMovieGenres = responseObj.genres;
    
    return arrayOfMovieGenres;
  }  
}

//export default MovieDB;

