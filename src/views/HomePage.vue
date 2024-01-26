<script>
import UserService from '@/services/UserService.js';
import MovieCard from '@/components/MovieCard.vue';
import ActorCard from '@/components/ActorCard.vue';

export default {
  components: {
    MovieCard,
    ActorCard,
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
      actors: [],
      formAddActor: false,
      firstname: '',
      lastname: '',
      dob: '',
      createdAt: '',
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
  filteredActors() {
      if (this.searchTerm.trim() === '') {
        return this.actors; // If search term is empty, return all actors
      }

      const searchTermLower = this.searchTerm.toLowerCase();

      return this.actors.filter(actor => {
        const actorName = `${actor.firstname} ${actor.lastname}`.toLowerCase();
        return actorName.includes(searchTermLower);
      });
    },
  lastFourMovies() {
      return this.movies.slice(0, 4); // Return the last 4 movies
    },
    lastFourActors() {
      return this.actors.slice(0, 4); // Return the last 4 actors
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
    async fetchActors() {
      try {
        const response = await UserService.getActors(this.currentPage);
        const myActors = response['hydra:member'];
        this.actors = myActors;
        this.totalPages = response['hydra:totalItems'];
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    },
    extractMovieId(movieUrl) {
      // Extract movie ID from the movie URL
      const parts = movieUrl.split('/');
      return parts[parts.length - 1];
    },
  },
  mounted() {
    // Fetch all movies when the component is mounted
    this.fetchMovies();
    this.fetchActors();
  },
};
</script>
<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-4">Last 4 movies</h1>
      <div class="flex flex-wrap -mx-4">
        <MovieCard v-for="movie in lastFourMovies" :key="movie.id" :movie="movie" class="w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 px-4 mb-4" />
      </div>
    </div>

    <div>
      <h1 class="text-2xl font-bold mb-4">Last 4 actors</h1>
      <div class="flex flex-wrap -mx-4">
        <ActorCard v-for="actor in lastFourActors" :key="actor.id" :actor="actor" class="w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 px-4 mb-4" />
      </div>
    </div>
  </div>
</template>

