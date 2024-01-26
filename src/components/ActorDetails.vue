<template>
  <div class="p-4">

    <div v-if="actor && typeof actor === 'object'" class="mb-4">
      <div v-if="!editMode" class="mb-2">
        <!-- Display mode -->
        <p><strong>First Name:</strong> {{ actor.firstname }}</p>
        <p><strong>Last Name:</strong> {{ actor.lastname }}</p>
        <p><strong>Date of Birth:</strong> {{ actor.dob }}</p>
        <p><strong>Created At:</strong> {{ actor.createdAt }}</p>
        <button @click="toggleEditMode" class="bg-blue-500 text-white px-2 py-1 rounded">Modify</button>
        <button @click="deleteActor" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>

      <form v-else @submit.prevent="submitActorDetails">
        <!-- Edit mode -->
        <label for="firstname" class="block mb-1">First Name:</label>
        <input v-model="actor.firstname" type="text" id="firstname" class="w-full mb-2 p-1 border border-gray-300 rounded" />

        <label for="lastname" class="block mb-1">Last Name:</label>
        <input v-model="actor.lastname" type="text" id="lastname" class="w-full mb-2 p-1 border border-gray-300 rounded" />

        <label for="dob" class="block mb-1">Date of Birth:</label>
        <input v-model="actor.dob" type="text" id="dob" class="w-full mb-2 p-1 border border-gray-300 rounded" />

        <label for="createdAt" class="block mb-1">Created At:</label>
        <input v-model="actor.createdAt" type="text" id="createdAt" class="w-full mb-2 p-1 border border-gray-300 rounded" />

        <!-- Add more fields as needed -->

        <button type="submit" class="bg-green-500 text-white px-2 py-1 rounded">Save Changes</button>
        <button @click="toggleEditMode" class="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
      </form>
    </div>

    <div v-else>
      <p>Loading actor details...</p>
    </div>
  </div>
</template>


<script>
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      actor: null,
      editMode: false,
    };
  },
  methods: {
    async fetchActorDetails(actorId) {
      try {
        const response = await UserService.getActorDetails(actorId);
        this.actor = response; // Assuming the response contains actor details
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    },
    async submitActorDetails() {
  try {
    // Send updated actor details to the server
    await UserService.patchActorDetails(this.actor, this.actor.id);
    console.log('Actor details updated successfully!');
    this.toggleEditMode(); // Switch back to display mode after saving changes
  } catch (error) {
    console.error('Error updating actor details:', error);
  }
},
async deleteActor() {
  // Display a confirmation dialog
  const confirmed = window.confirm("Are you sure you want to delete this actor?");

  // Check if the user confirmed the deletion
  if (confirmed) {
    try {
      // Send updated actor details to the server
      await UserService.deleteActor(this.actor.id);
      console.log('Actor deleted successfully!');
      
      // Redirect to the actors page
      this.$router.push('/actors'); // Assuming the route for the actors page is '/actors'
    } catch (error) {
      console.error('Error deleting actor:', error);
    }
  }
},

 
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
  },
  mounted() {
    // Fetch actor details when the component is mounted
    const actorId = this.$route.params.actorId;
    this.fetchActorDetails(actorId);
  },
};
</script>
