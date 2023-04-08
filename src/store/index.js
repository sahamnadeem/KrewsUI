import { createStore } from 'vuex'
import axios from "axios";
import { API_BASE_URL, HEADERS } from "@/libs/config";

export default createStore({
  state: {
    currentPosts:null,
    posts: [],
    error:'',
    errorSnackbar:false
  },
  getters: {
    getPosts(state){
      return state.posts
    },
    getCurrentResponse(state){
      return state.currentPosts
    }
  },
  mutations: {
    SET_POSTS (state, payload){
      state.posts = payload
    },
    SET_RESPONSE (state, payload){
      state.currentPosts = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    SET_SNACKBAR(state, payload){
      state.errorSnackbar = payload
    }
  },
  actions: {
    getPosts(context) {
      axios
        .get(API_BASE_URL + "post", HEADERS)
        .then((response) => {
          // Handle successful login response
          context.commit('SET_RESPONSE',response.data)
          context.commit('SET_POSTS',response.data.data)
        })
        .catch((error) => {
          // Display error message to user
          if(error.response.data.errors.email)  context.commit('SET_ERROR', error.response.data.errors.email[0])
          else context.commit('SET_ERROR', error.response.data.message)
          context.commit('SET_SNACKBAR',true)
        });
    }
  },
  modules: {
  }
})
