import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: null,
      loggedIn: false,
      currentToken : "",
    }
  },
  actions: {
    login({ token }) {
      console.log( token, 'check login')

      if ( token) {
      this.loggedIn = true
      console.log(this.loggedIn, 'console log')
      this.currentToken = token
      return true
      } 
      return false
    },
    logout() {
      this.loggedIn = false
      this.user = null
    }

  }
})