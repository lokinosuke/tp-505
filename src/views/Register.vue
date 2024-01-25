<template>
    <div id="register-form" class="flex justify-center items-center h-screen">
      <form @submit.prevent="registerUser()" class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-semibold mb-4">{{ title }}</h1>
        <hr class="mb-4" />
  
        <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          id="email"
          name="email"
          v-model="email"
          required
          class="w-full px-4 py-2 border rounded mt-1"
        />
  
        <label for="password" class="block text-sm font-medium text-gray-600 mt-4">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
          v-model="password"
          required
          class="w-full px-4 py-2 border rounded mt-1"
        />
  
        <p class="mt-4"><button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Register</button></p>
        <p class="mt-4">Already a member ?<router-link to="/login" class="text-blue-500"> login now</router-link></p>
      </form>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'pinia';
  import { useSession } from "../stores/session";
  import UserService from '@/services/UserService.js';
  
  export default {
    name: "RegisterForm",
    data() {
      return {
        title: "Registration",
        email: "",
        password: ""
      }
    },
    computed: {
      ...mapState(useSession, ["loggedIn"])
    },
    methods: {
      ...mapActions(useSession, ["login"]),
      async registerUser() {
        try {
          const response = await UserService.register({ email: this.email, password: this.password });
  
          if (response.status === 201) {
            // Registration successful, now login the user
            await this.loginUser();
  
            // Redirect to a different page if needed
            this.$router.push('/dashboard');
          } else {
            // Handle registration failure and display detailed error information
            const errorData = await response.json();
            console.error('Registration failed:', errorData);
          }
        } catch (error) {
          // Handle unexpected errors (e.g., network issues)
          console.error('Unexpected error during registration:', error);
        }
      },
      async loginUser() {
        try {
          // Use the same credentials used for registration
          await this.login({ username: this.email, password: this.password });
        } catch (error) {
          console.error('Error during login after registration:', error);
        }
      },
    }
  }
  </script>
  