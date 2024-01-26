<template>
  <div id="login-form" class="flex justify-center items-center h-screen">
    <form @submit.prevent="postUser()" class="bg-white p-8 rounded shadow-md w-96">
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

      <label for="psw" class="block text-sm font-medium text-gray-600 mt-4">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        id="psw"
        name="psw"
        v-model="psw"
        required
        class="w-full px-4 py-2 border rounded mt-1"
      />

      <p class="mt-4"><button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button></p>
      <p class="mt-4">Not a member ?<router-link to="/register" class="text-blue-500"> register now</router-link></p>
    </form>
  </div>
</template>
  
  <script>
  import { mapState, mapActions } from 'pinia';
  import { useSession } from "../stores/session";
  import UserService from '@/services/UserService.js'
  export default {
      name: "LoginForm",
      data(){
          return {
              title: "Authentication",
              email: "",
              psw: ""
          }
      },
      computed: {
      ...mapState(useSession, ["loggedIn"])
    },

      methods: {
        ...mapActions(useSession, ["login"]),

            async postUser() {
              const response = await UserService.login({ username: this.email, password: this.psw })
              console.log(response, "heu ?")
              const session = useSession();
              session.login({  token: response.token });
              //this.$router.push('/search');
              this.$router.push('/actors');
              console.log("connecté ! Normalement ...")
            },
        }
      
  }
  </script>