<template>
    <div class="p-4">
      <!-- Dropdown for selecting genre -->
      <div class="mb-4">
        <label for="genre" class="block mb-1">Select Genre:</label>
        <select v-model="selectedGenre" @change="filterMoviesByGenre" class="w-full p-2 border border-gray-300 rounded">
          <option value="">All Genres</option>
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
      </div>
  
      <!-- Display Movies based on Genre -->
      <div class="flex flex-wrap justify-center" v-if="filteredMovies.length">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
  
      <!-- No Movies Found -->
      <div v-else>
        <p>No movies found</p>
      </div>
  
      <!-- Pagination Buttons -->
      <div class="flex flex-col items-center justify-center mt-4">
        <div class="mb-4">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="bg-blue-500 text-white px-4 py-2 mr-2 rounded disabled:opacity-50"
          >
            Previous Page
          </button>
          <span class="mr-2">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next Page
          </button>
    </div>
      </div>
    </div>
  </template>
  
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
        overview: '',
        searchTerm: '',
        selectedGenre: '', // New data property for selected genre
        currentPage: 1,
        totalPages: 10,
      };
    },
    computed: {
      filteredMovies() {
        const searchTermLower = this.searchTerm.toLowerCase();
  
        return this.movies.filter(movie => {
          const movieTitleLower = movie.title.toLowerCase();
          return movieTitleLower.includes(searchTermLower) &&
            (this.selectedGenre === '' || movie.genre === this.selectedGenre);
        });
      },
    },
    methods: {
      async fetchMovies() {
        try {
          const response = await UserService.getMovies(this.currentPage);
          this.movies = response['hydra:member'];
          this.movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
          this.totalPages = response['hydra:totalItems'];
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      },
      async postMovie() {
        try {
          // Add your post movie logic here
        } catch (error) {
          console.log(error);
        }
      },
      goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.currentPage = pageNumber;
          this.fetchMovies();
        }
      },
      filterMoviesByGenre() {
        this.currentPage = 1;
        this.fetchMovies();
      },
    },
    mounted() {
      this.fetchMovies();
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>
  