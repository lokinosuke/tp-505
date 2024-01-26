<!-- Actors.vue -->

<template>
  <div class="p-4">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search actors..."
      class="w-full mb-2 p-1 border border-gray-300 rounded"
    />

    <div class="flex flex-wrap">
      <!-- Use the ActorCard component -->
      <actor-card
        v-for="actor in filteredActors"
        :key="actor.id"
        :actor="actor"
        @show-details="showActorDetails"
      />
    </div>

    <div class="mt-4">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="bg-blue-500 text-white px-4 py-2 mr-2">
        Previous Page
      </button>
      <span class="mr-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="bg-blue-500 text-white px-4 py-2">
        Next Page
      </button>
    </div>

    <button @click="buttonAddActor" class="bg-blue-500 text-white px-4 py-2 mt-4">
      Add Actor
    </button>

    <div v-if="formAddActor" class="mt-4">
      <form action="" method="post">
        <label for="firstname" class="block text-sm font-medium text-gray-700">Firstname</label>
        <input type="text" id="firstname" v-model="firstname" class="form-input mt-1">

        <label for="lastname" class="block text-sm font-medium text-gray-700">Lastname</label>
        <input type="text" id="lastname" v-model="lastname" class="form-input mt-1">

        <label for="birthdate" class="block text-sm font-medium text-gray-700">Birthdate</label>
        <input type="text" id="dob" v-model="dob" class="form-input mt-1">

        <label for="createdAt" class="block text-sm font-medium text-gray-700">Created At</label>
        <input type="text" id="createdAt" v-model="createdAt" class="form-input mt-1">

        <button @click.prevent="postActor" class="bg-blue-500 text-white px-4 py-2 mt-4">
          Add Actor
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// Import the ActorCard component
import ActorCard from '@/components/ActorCard.vue';
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      actors: [],
      formAddActor: false,
      firstname: '',
      lastname: '',
      dob: '',
      createdAt: '',
      searchTerm: '',
      currentPage: 1,
      totalPages: 5,
    };
  },
  computed: {
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
  },
  methods: {
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
    showActorDetails(actorId) {
      this.$router.push({ name: 'ActorDetails', params: { actorId } });
    },
    async postActor() {
      try {
        const response = await UserService.postActor({
          firstname: this.firstname,
          lastname: this.lastname,
          dob: this.dob,
          createdAt: this.createdAt,
        });
        this.actors.push(response);
        this.firstname = '';
        this.lastname = '';
        this.dob = '';
        this.createdAt = '';
      } catch (error) {
        console.log(error);
      }
    },
    buttonAddActor() {
      this.formAddActor = !this.formAddActor;
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchActors();
      }
    },
  },
  components: {
    ActorCard,
  },
  mounted() {
    this.fetchActors();
  },
};
</script>
