import { api } from '@/services/api.js'
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";

export default {

  ...mapState(useSession, ["currentToken"]),


  register (credentials) {
    return api('/users', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  login (credentials) {
    return api('/login_check', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  user () {
    return api('/users')
  },
  getUser () {
    return api('/me')
  },
  getActors (pageNumber) {
    return api('/actors?page='+pageNumber)
  },
  getActorDetails (actorId) {
        return api('/actors/' + actorId)
    },
  deleteActor (actorId) {
    return api('/actors/' + actorId, {
      method: 'DELETE'
    })
  },
  postActor (credentials) {
    return api('/actors', {
      method: 'POST',
      body: JSON.stringify(credentials),

    })
  },
  patchActorDetails (credentials, actorId) {
    return api('/actors/' + actorId, {
      method: 'PATCH',
      body: JSON.stringify(credentials),

    }) },

    getMovies (pageNumber) {
        return api('/movies?page='+pageNumber)
    },
    getLastMovies () {
        return api('/movies')
    },
    getLastActors () {
        return api('/actors')
    },
    getMovieDetails (movieId) {
        return api('/movies/' + movieId)
    },
    postMovie (credentials) {
        return api('/movies', {
            method: 'POST',
            body: JSON.stringify(credentials),

        })
    },
    patchMovieDetails (credentials, movieId) {
        return api('/movies/' + movieId, {
            method: 'PATCH',
            body: JSON.stringify(credentials),

        }) },
    deleteMovie (movieId) {
        return api('/movies/' + movieId, {
            method: 'DELETE'
        })
    },
    getCategories (pageNumber) {
        return api('/categories')
    },
    getCategoryDetails (categoryId) {
        return api('/categories/' + categoryId)
    },
    postCategories (credentials) {
        return api('/categories', {
            method: 'POST',
            body: JSON.stringify(credentials),

        })
    },
    
  getMedia (id) {
    return api('/media_objects/' + id)
  },
  postMedia (newImage){
    var formdata = new FormData();
    console.log(newImage)
    formdata.append("file",newImage);

    return api('/media_objects', {
      method: 'POST',
      body: formdata,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }

    })
  }
}