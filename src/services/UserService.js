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
  getActors (pageNumber) {
    return api('/actors')
  },
  getActorDetails (actorId) {
        return api('/actors/' + actorId)
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
        return api('/movies')
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