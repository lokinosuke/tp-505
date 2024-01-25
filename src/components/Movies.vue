<template>
  <div>
    
      <input v-model="searchTerm" type="text" placeholder="Search movies..." class="w-full mb-2 p-1 border border-gray-300 rounded" />
      <div v-if="filteredMovies && filteredMovies.length > 0">
        <ul>
          <li v-for="movie in filteredMovies" :key="movie.id">
            <router-link :to="{ name: 'MovieDetails', params: { movieId: extractMovieId(movie['@id']) } }">
              {{ movie.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No movies found</p>
      </div>
    <div v-if="movies && movies.length > 0">
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <router-link :to="{ name: 'MovieDetails', params: { movieId: extractMovieId(movie['@id']) } }">
            {{ movie.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading movies...</p>
    </div>
    <button @click="buttonAddMovie" class="bg-gray-500 text-white px-2 py-1 rounded">Add Movie</button>
    <div v-if="formAddMovie" class="mt-4">
      <form action="" method="post">
        <label for="title" class="block mb-1">Title:</label>
        <input v-model="title" type="text" id="title" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="overview" class="block mb-1">Overview:</label>
        <input v-model="overview" type="text" id="overview" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="releaseDate" class="block mb-1">Release Date:</label>
        <input v-model="releaseDate" type="text" id="releaseDate" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="createdAt" class="block mb-1">Created At:</label>
        <input v-model="createdAt" type="text" id="createdAt" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <select v-model="genre" class="w-full mb-2 p-1 border border-gray-300 rounded">
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Biography">Biography</option>
          <option value="Family">Family</option>
          <option value="Crime">Crime</option>
          <option value="Suspense">Suspense</option>
          <option value="Documentary">Documentary</option>
          <option value="TV Movie">TV Movie</option>
          <option value="Music">Music</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Western">Western</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
        </select>
        <button @click.prevent="postMovie" class="bg-blue-500 text-white px-4 py-2 mt-4">Add Movie</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      movies: [],
      formAddMovie: false,
      title: '',
      releaseDate: '',
      createdAt: '',
      genre: '',
      searchTerm: '',
    };
  },
  computed: {
  filteredMovies() {
    const searchTermLower = this.searchTerm.toLowerCase(); // Convert search term to lowercase

    return this.movies.filter(movie => {
      const movieTitleLower = movie.title.toLowerCase(); // Convert movie title to lowercase
      return movieTitleLower.includes(searchTermLower);
    });
  },
},
  methods: {
    async fetchMovies() {
      try {
        const response = await UserService.getMovies();
        this.movies = response['hydra:member']; // Extract the movies array from the response
        const last4Movies = this.movies.slice(0, 4);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    extractMovieId(movieUrl) {
      // Extract movie ID from the movie URL
      const parts = movieUrl.split('/');
      return parts[parts.length - 1];
    },
    async postMovie() {
      try {
        const response = await UserService.postMovie({
          title: this.title,
          releaseDate: this.releaseDate,
          createdAt: this.createdAt,
          genre: this.genre,
          overview: this.overview,
        });
        this.movies.push(response);
        this.title = '';
        this.releaseDate = '';
        this.createdAt = '';
        this.genre = '';
        this.overview = '';
      } catch (error) {
        console.log(error);
      }
    },
    buttonAddMovie() {
      this.formAddMovie = !this.formAddMovie;
    },
  },
  mounted() {
    // Fetch all movies when the component is mounted
    this.fetchMovies();
  },
};
</script>

