import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Actors from '../components/Actors.vue'
import Movies from '../components/Movies.vue'
import Categories from '../views/Categories.vue'
import MovieDetails from '@/components/MovieDetails.vue'
import ActorDetails from '@/components/ActorDetails.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/actors',  
      name: 'actors',
      component: Actors
    },
    { 
      path: '/actor/:actorId',  
      name: 'ActorDetails',
      component: ActorDetails,
      props: true
    },
    {
      path: '/movies',  
      name: 'movies',
      component: Movies
    },
    {
      path: '/movie/:movieId',  
      name: 'MovieDetails',
      component: MovieDetails,
      props: true
    },
    {
      path: '/categories',  
      name: 'categories',
      component: Categories
    },
    {
      path: '/login',  
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }

  ]
})

// router.beforeEach(async (to, from) => {
//     const session = useSession()
//     if (
//       // make sure the user is authenticated
//       !session.loggedIn &&
//       // ❗️ Avoid an infinite redirect
//       to.name !== 'login'
//     ) {
//       // redirect the user to the login page
//       return { name: 'login' }
//     }else if(to.name === "login" && session.loggedIn){
//         return { name : 'home'}
//     }
//   })

export default router
