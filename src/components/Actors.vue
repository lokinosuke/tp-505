<script>
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      actors: [],
      formAddActor: false,
      firstname: '',
      lastname: '',
      birthdate: '',
      createdAt: '',
      updatedAt: '',
      searchTerm: '',
    };
  },
  computed: {
    filteredActors() {
      if (this.searchTerm.trim() === '') {
        return []; // If search term is empty, return an empty array
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
  },
  mounted() {
    this.fetchActors();
  },
};
</script>

<template>
  <div>
    <input v-model="searchTerm" type="text" placeholder="Search actors..." class="w-full mb-2 p-1 border border-gray-300 rounded" />
    <div v-for="actor in filteredActors" :key="actor.id" @click="showActorDetails(actor.id)" class="w-20 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-2 mb-4 cursor-pointer">
  <img src="../assets/images/poster.webp" alt="" class="w-full h-20 object-cover rounded-md mb-2">
  <p class="text-xs text-gray-800 truncate">{{ actor.firstname }} {{ actor.lastname }}</p>
</div>

    <div class="flex flex-wrap">
      <div
        v-for="actor in actors"
        :key="actor.id"
        @click="showActorDetails(actor.id)"
        class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 mx-2 mb-4 cursor-pointer"
      >
        <img src="../assets/images/poster.webp" alt="" class="w-full h-40 object-cover rounded-md mb-2">
        <p class="text-xs text-gray-800 truncate">{{ actor.firstname }}</p>
      </div>
    </div>
    <button @click="buttonAddActor" class="bg-blue-500 text-white px-4 py-2 mt-4">Add Actor</button>

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
        <button @click.prevent="postActor" class="bg-blue-500 text-white px-4 py-2 mt-4">Add Actor</button>
      </form>
    </div>
  </div>
</template>
