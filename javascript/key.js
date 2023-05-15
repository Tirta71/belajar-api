const API_KEY = "api_key=d1a17394e90f054722607240b5834823";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const BackgroundImg = document.querySelector(".background-img");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie");
    movieE1.innerHTML = `

        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class="movie-info">
          <h1>${title}</h1>
          <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
         ${overview}
        </div>

        `;
    main.appendChild(movieE1);
  });
}

function getcolor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function getBackgroundImage() {
  fetch(BASE_URL + "/movie/popular?" + API_KEY)
    .then((res) => res.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const movie = data.results[randomIndex];
      const backdropPath = movie.backdrop_path;
      const backdropURL = IMG_URL + backdropPath;
      BackgroundImg.style.backgroundImage = `url(${backdropURL})`;
    });
}

// Tangkap acara submit form
form.addEventListener("keyup", function (event) {
  event.preventDefault(); // Mencegah pengiriman form

  // Dapatkan nilai input pencarian
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.trim();

  // Cek apakah input tidak kosong
  if (searchValue !== "") {
    // Buat URL pencarian berdasarkan input pengguna
    const searchURL = `${BASE_URL}/search/movie?${API_KEY}&query=${encodeURIComponent(
      searchValue
    )}`;

    // Ambil film berdasarkan pencarian
    getMovies(searchURL);
  } else {
    // Jika input kosong, tampilkan semua film
    getMovies(API_URL);
  }
});

// Fungsi untuk mendapatkan film berdasarkan URL
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}
getBackgroundImage();
fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const cardElements = document.querySelectorAll(".card-img");

    cardElements.forEach((cardElement, index) => {
      const imageElement = cardElement.querySelector("img");
      const titleElement = cardElement.querySelector(".title");
      const watchElement = cardElement.querySelector(".watch");

      // Mengganti sumber gambar
      imageElement.src = IMG_URL + data.results[index].poster_path;

      // Menambahkan event listener pada elemen .card-img
      cardElement.addEventListener("mouseover", function () {
        // Mengganti teks judul saat kursor diarahkan
        titleElement.textContent = data.results[index].title;

        // Mengganti teks tombol saat kursor diarahkan
        watchElement.textContent = "Watch Now";
      });

      // Mengembalikan teks judul dan tombol saat kursor meninggalkan elemen
      cardElement.addEventListener("mouseout", function () {
        // Mengembalikan teks judul saat kursor meninggalkan elemen
        titleElement.textContent = "";

        // Mengembalikan teks tombol saat kursor meninggalkan elemen
        watchElement.textContent = "";
      });
    });
  })
  .catch((error) => {
    console.log("Error fetching API data:", error);
  });
