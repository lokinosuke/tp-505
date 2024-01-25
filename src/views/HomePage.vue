<script setup>
// display last 4 movies from component Movies.vue
import { ref, onMounted } from 'vue';
import UserService from '@/services/UserService.js';

const movies = ref([]);

onMounted(async () => {
  try {
    const response = await UserService.getMovies();
    movies.value = response['hydra:member'];
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

</script>

<template>
  <div>
    <div class="flex flex-wrap">
      <div
        v-for="movie in movies.slice(0, 4)"
        :key="movie.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
      >
        <router-link :to="{ name: 'MovieDetails', params: { movieId: extractMovieId(movie['@id']) } }">
          <div class="bg-gray-200 p-2 rounded">
            <p class="text-lg font-bold">{{ movie.title }}</p>
            <p class="text-sm">{{ movie.releaseDate }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
