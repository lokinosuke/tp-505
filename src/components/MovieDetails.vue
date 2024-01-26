<template>
  <div class="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
    <div v-if="movie && typeof movie === 'object'" class="mb-4">
      <div v-if="!editMode" class="mb-2">
        <!-- Display mode -->
        <p class="mb-1"><strong>Title:</strong> {{ movie.title }}</p>
        <p class="mb-1"><strong>Overview:</strong> {{ movie.overview }}</p>
        <p class="mb-1"><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
        <p class="mb-1"><strong>Created At:</strong> {{ movie.createdAt }}</p>
        <p class="mb-1"><strong>Genre:</strong> {{ movie.genre }}</p>
        <button @click="toggleEditMode" class="bg-blue-500 text-white px-2 py-1 rounded">Modify</button>
        <button @click="deleteMovie" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
      <form v-else @submit.prevent="submitMovieDetails" class="mb-4">
        <!-- Edit mode -->
        <label for="title" class="block mb-1">Title:</label>
        <input v-model="movie.title" type="text" id="title" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="overview" class="block mb-1">Overview:</label>
        <input v-model="movie.overview" type="text" id="overview" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="releaseDate" class="block mb-1">Release Date:</label>
        <input v-model="movie.releaseDate" type="text" id="releaseDate" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="createdAt" class="block mb-1">Created At:</label>
        <input v-model="movie.createdAt" type="text" id="createdAt" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <label for="genre" class="block mb-1">Genre:</label>
        <input v-model="movie.genre" type="text" id="genre" class="w-full mb-2 p-1 border border-gray-300 rounded" />
        <button type="submit" class="bg-green-500 text-white px-2 py-1 rounded">Save Changes</button>
        <button @click="toggleEditMode" class="bg-gray-500 text-white px-2 py-1 rounded ml-2">Cancel</button>
      </form>
    </div>
    <div v-else>
      <p>Loading movie details...</p>
    </div>
  </div>
</template>


<script>
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      movie: null,
      editMode: false,
    };
  },
  methods: {
    async fetchMovieDetails(movieId) {
      try {
        const response = await UserService.getMovieDetails(movieId);
        this.movie = response; // Assuming the response contains movie details
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    async submitMovieDetails() {
  try {
    // Send updated actor details to the server
    await UserService.patchMovieDetails(this.movie, this.movie.id);
    console.log('Actor details updated successfully!');
    this.toggleEditMode(); // Switch back to display mode after saving changes
  } catch (error) {
    console.error('Error updating movie details:', error);
  }
},
async deleteMovie() {
  // Display a confirmation dialog
  const confirmed = window.confirm("Are you sure you want to delete this movie?");

  // Check if the user confirmed the deletion
  if (confirmed) {
    try {
      // Send updated actor details to the server
      await UserService.deleteMovie(this.movie.id);
      console.log('Actor deleted successfully!');
      
      // Redirect to the actors page
      this.$router.push('/movies'); // Assuming the route for the actors page is '/actors'
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  }
},

    toggleEditMode() {
      this.editMode = !this.editMode;
    },
  },
  mounted() {
    // Fetch movie details when the component is mounted
    const movieId = this.$route.params.movieId;
    this.fetchMovieDetails(movieId);
  },
};
</script>
