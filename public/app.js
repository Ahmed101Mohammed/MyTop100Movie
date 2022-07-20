// import modules:
import getMovies from './javaScriptModules/getMoviesFetch';

//The url of TMDB:
let url = 'https://api.themoviedb.org/3';

// my Api key
let key = `api_key=f1368dac7104e8f7e377d4047ff7ac7e`;

// discovers links:
let pupolarMovies = `/discover/movie?sort_by=popularity.desc&`;

getMovies(url,pupolarMovies,key);