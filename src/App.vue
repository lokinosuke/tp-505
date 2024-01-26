<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useSession } from "@/stores/session";

const session = useSession();

const logout = () => {
  session.logout();
  // Redirect to the login page or home page after logout
  // Example assuming you have a /login route
  // Uncomment the next line if you have a /login route
  router.push("/login");
};
</script>
<template>
  <div class="wrapper">
    <nav class="bg-blue-500 p-4">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <ul class="flex space-x-4 text-white">
            <li>
              <RouterLink
                to="/"
                aria-current="page"
                class="hover:text-gray-300"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/actors"
                class="hover:text-gray-300"
              >
                Actors
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/movies"
                class="hover:text-gray-300"
              >
                Movies
              </RouterLink>
            </li>
            <li>
            </li>
            <li v-if="session.loggedIn" class="flex items-center space-x-2">
              <RouterLink
                to="/profile"
                class="hover:text-gray-300"
              >
                Profile
              </RouterLink>
              <button
                @click="logout"
                class="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </li>
            <li v-else>
              <RouterLink
                to="/login"
                class="hover:text-gray-300"
              >
                Login
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>

</style>
