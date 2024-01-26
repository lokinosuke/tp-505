<!-- ActorCard.vue -->

<template>
    <div @click="showActorDetails" 
    class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-2 mb-4 cursor-pointer">
      <img :src="actorImage" alt="" 
      class="w-full h-40 object-cover rounded-md mb-2">
      <p class="text-xs text-gray-800 truncate">{{ actor.firstname }} {{ actor.lastname }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      actor: Object,
    },
    methods: {
      showActorDetails() {
        this.$emit('show-details', this.actor.id);
      },
    },
    computed: {
      actorImage() {
        // Assuming you have an image URL in your actor object
        return this.actor.image || "https://via.placeholder.com/300";
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  