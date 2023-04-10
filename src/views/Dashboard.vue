<template>
  <v-app id="inspire">
    <nav-bar :links="links"></nav-bar>
    <router-view />
    <v-snackbar
      v-if="error"
      v-model="error.state"
      :timeout="error.timeout"
      color="error"
      location="top right"
    >
      <div class="text-subtitle-1 pb-2">
        <b>{{ error.title }}</b>
      </div>
      <p>{{ error.message }}</p>
    </v-snackbar>
  </v-app>
</template>
  
<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      links: [
        {
          name: "Dashboard",
          link: "/",
        }
      ],
    };
  },
  methods: {
    onScroll() {
      const that = this;
      // Check if the page hit the bottom
      window.onscroll = function (ev) {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight &&
          that.loading === false
        ) {
          // Load more posts if its already not loading
          that.loadMorePosts();
        }
      };
    },
    loadMorePosts() {
      // Call store action to get posts
      this.$store.dispatch("getMorePosts");
    },
  },
  computed: {
    loading() {
      return this.$store.getters.getLoadingState;
    },
    error:{
      // Computed property to get and set values directly in store in case of error snack bar displays and hides
      get(){
        return this.$store.getters.getError
      },
      set(){
        this.$store.dispatch('removeError')
      }
    }
  },
  mounted() {
    // Get posts on page mount
    this.$store.dispatch("getPosts");
    this.onScroll();
  },
};
</script>
  
<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
  