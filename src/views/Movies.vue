<script>
import UserService from '@/services/UserService.js';
import MovieCard from '@/components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
      formAddMovie: false,
      title: '',
      releaseDate: '',
      createdAt: '',
      genre: '',
      searchTerm: '',
      currentPage: 1,
      totalPages: 5,
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
        const response = await UserService.getMovies(this.currentPage);
        this.movies = response['hydra:member']; // Extract the movies array from the response

        // Sort movies by release date in descending order (newest first)
        this.movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

        this.totalPages = response['hydra:totalItems'];
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
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchMovies();
      }
    },
  },
  mounted() {
    // Fetch all movies when the component is mounted
    this.fetchMovies();
  },
};
</script>
<template>
  <div>
    <input v-model="searchTerm" type="text" placeholder="Search movies..." class="w-full mb-2 p-1 border border-gray-300 rounded" />
    <div class="flex flex-wrap column" v-if="filteredMovies.length">
      <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
    </div>
    <div v-else>
      <p>No movies found</p>
    </div>
    <div class="mt-4">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
        Previous Page
      </button>
      <span class="mr-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="bg-blue-500 text-white px-4 py-2 rounded">
        Next Page
      </button>
    </div>
    <button @click="buttonAddMovie" class="bg-gray-500 text-white px-2 py-1 rounded mt-4">Add Movie</button>
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
        <button @click.prevent="postMovie" class="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Add Movie</button>
      </form>
    </div>
  </div>
</template>
