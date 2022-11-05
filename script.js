const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
const SEARCHURL = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

async function getMovies(url = APIURL) {
  const resp = await fetch(url);
  const data = await resp.json();
  const movies = data.results;

  return movies;
}

async function renderMovies(url = undefined) {
  const moviesListEl = document.getElementById("movies-list");
  const moviesFragment = document.createDocumentFragment();
  const movies = await getMovies(url);

  movies.forEach((movie) => {
    const movieEl = createMovie(movie);
    toggleOverview(movieEl);
    moviesFragment.appendChild(movieEl);
  });
  moviesListEl.innerHTML = '';
  moviesListEl.appendChild(moviesFragment);
}

function searchMovie() {
  const searchForm = document.getElementById('search-form');
  const movieInput = document.getElementById('movie-input');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = SEARCHURL + movieInput.value;
    renderMovies(searchTerm)
  })
}

function createMovie(movie) {
  const movieEl = document.createElement("li");
  movieEl.classList.add("movies__item", "movie");
  movieEl.innerHTML = `
      <div class="movie__image">
      <img src="${IMGPATH + movie.poster_path}" width="300" height="450" alt="${movie.title}">
      </div>
      <div class="movie__info">
      <h3 class="movie__title">${movie.title}</h3>
      <p class="movie__rating">${movie.vote_average}</p>
      </div>
      <div class="movie_overview overview overview--hidden">
      <h4 class="overview__title">Overview:</h4>
      <p class="overview__content">${movie.overview}</p>
      </div>
    `;
  return movieEl;
}

function toggleOverview(movieEl) {
  const movieOverview = movieEl.querySelector('.overview');
  movieEl.addEventListener('mouseover', (e) => {
    movieOverview.classList.remove('overview--hidden')
  });
  movieEl.addEventListener('mouseout', (e) => {
    movieOverview.classList.add('overview--hidden')
  });
}

renderMovies();
searchMovie();