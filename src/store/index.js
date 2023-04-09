import { createStore } from 'vuex'
import axios from "axios";
import { API_BASE_URL, getHeaders } from "@/libs/config";

export default createStore({
  state: {
    currentPosts: null,
    posts: [],
    error: '',
    errorSnackbar: false,
    loading:false,
    toke:null,
    user:null,
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    getCurrentResponse(state) {
      return state.currentPosts
    },
    getLoadingState(state){
      return state.loading
    },
    getToken(state){
      return state.token
    },
    getUser(state){
      return state.user
    }
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts.push(...payload)
    },
    SET_RESPONSE(state, payload) {
      state.currentPosts = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    SET_SNACKBAR(state, payload) {
      state.errorSnackbar = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    DELETE_POST(state, payload) {
      const index = state.posts.indexOf(state.posts.find(obj => obj.id === payload.id))
      state.posts.splice(index, 1)
    },
    STORE_AUTH(state, payload){
      state.token = payload.token
      state.user = payload.user
    }
  },
  actions: {
    getPosts(context) {
      context.commit('SET_LOADING',true)
      axios
        .get(API_BASE_URL + "post", getHeaders())
        .then((response) => {
          // Handle successful login response
          context.commit('SET_RESPONSE', response.data)
          context.commit('SET_POSTS', response.data.data)
        })
        .catch((error) => {
          // Display error message to user
          if (error.response.data.message) context.commit('SET_ERROR', error.response.data.message)
          context.commit('SET_SNACKBAR', true)
        })
        .finally(()=>{
          context.commit('SET_LOADING',false)
        })
    },
    deletePost(context, payload) {
      context.commit('DELETE_POST', payload)
    },
    getMorePosts({commit, state}) {
      if(state.currentPosts.next_page_url){
        commit('SET_LOADING',true)
        axios
        .get(state.currentPosts.next_page_url, getHeaders())
        .then((response) => {
          // Handle successful login response
          commit('SET_RESPONSE', response.data)
          commit('SET_POSTS', response.data.data)
        })
        .catch((error) => {
          // Display error message to user
          if (error.response.data.message) context.commit('SET_ERROR', error.response.data.message)
          context.commit('SET_SNACKBAR', true)
        })
        .finally(()=>{
          commit('SET_LOADING',false)
        })
      }
    },
    store_auth(context, payload){
      context.commit('STORE_AUTH',payload);
    }
  },
  modules: {
  }
})
