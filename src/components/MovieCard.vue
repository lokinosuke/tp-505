<template>
    <div class="movie-card">
      <router-link 
      :to="{ name: 'MovieDetails', params: { movieId: extractMovieId(movie['@id']) } }"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-2 mb-4 cursor-pointer">
        <img :src="movieImage" :alt="movie.title" 
        class="w-full h-40 object-cover rounded-md mb-2">
        <p class="text-xs text-gray-800 truncate">{{ movie.title }}</p>
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
    computed: {
      movieImage() {
        // Assuming you have an image URL in your movie object
        return this.movie.image || "https://via.placeholder.com/300";
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  