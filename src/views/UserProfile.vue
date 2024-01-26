<template>
  <div v-if="user" class="flex flex-wrap">
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
      <div class="bg-gray-200 p-2 rounded">
        <p class="text-sm">{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useSession } from '../stores/session';
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async getUser() {
      try {
        const response = await UserService.getUser();
        console.log(response);
        this.user = response;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
