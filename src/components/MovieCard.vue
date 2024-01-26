<template>
    <div class="movie-card">
      <router-link :to="{ name: 'MovieDetails', params: { movieId: extractMovieId(movie['@id']) } }">
        {{ movie.title }}
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
    methods: {
      extractMovieId(movieUrl) {
        // Extract movie ID from the movie URL
        const parts = movieUrl.split('/');
        return parts[parts.length - 1];
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling for the movie card here */
  .movie-card {
    /* Add your styles here */
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
  }
  </style>
  