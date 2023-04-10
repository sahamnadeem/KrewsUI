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
    next_page:1,
    is_update:false,
    editPost:null,
    popup:false,
    imageSrc:null,
    imageList:[],
    snackError:null
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
    },
    getIsUpdate(state){
      return state.is_update
    },
    getEditPost(state){
      return state.editPost
    },
    getPopup(state){
      return state.popup
    },
    getImageSrc(state){
      return state.imageSrc
    },
    getImageList(state){
      return state.imageList
    },
    getError(state){
      return state.snackError
    }
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts.push(...payload)
    },
    SET_POSTS_TOP(state, payload){
      state.posts = payload.concat(state.posts)
    },
    SET_RESPONSE(state, payload) {
      state.currentPosts = payload
      if(payload.next_page_url) state.next_page = state.next_page+1
      else state.next_page = null
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
    },
    EDIT_POST(state, payload){
      state.is_update = true
      state.editPost = payload
    },
    RESET_EDIT(state){
      state.is_update = false
      state.editPost = null
    },
    TOGGLE_IMAGE(state, payload){
      state.popup = !state.popup
      if(payload){
        state.imageSrc = payload.images[0]
        state.imageList = payload.images
      }
    },
    CHANGE_IMAGE(state, payload){
      state.imageSrc = payload
    },
    MAKE_ERROR(state, payload){
      state.snackError = payload
    },
    REMOVE_ERROR(state){
      state.snackError = null
    },
    CLEAR_STORE(state){
      state.currentPosts =  null
      state.posts= []
      state.error = ''
      state.errorSnackbar = false
      state.loading = false
      state.token = null
      state.user = null
      state.next_page = 1
      state.is_update = false
      state.editPost = null
      state.popup = false
      state.imageSrc = null
      state.imageList = []
      state.snackError = null
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
      if(state.next_page){
        commit('SET_LOADING',true)
        axios
        .get(API_BASE_URL + "post?page="+ state.next_page, getHeaders())
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
    },
    addPost(context, payload){
      context.commit('SET_POSTS_TOP',[payload.post])
    },
    editPost(context, payload){
      context.commit('EDIT_POST',payload)
    },
    clearUpdate(context){
      context.commit('RESET_EDIT')
    },
    toggleImage(context, payload){
      context.commit('TOGGLE_IMAGE', payload)
    },
    changeImage(context, payload){
      context.commit('CHANGE_IMAGE', payload)
    },
    setError(context, payload){
      context.commit('MAKE_ERROR', payload)
    },
    removeError(context){
      context.commit('REMOVE_ERROR')
    },
    clearStore(context){
      context.commit('CLEAR_STORE')
    }
  },
  modules: {
  }
})
