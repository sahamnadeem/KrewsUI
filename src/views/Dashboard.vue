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
      window.onscroll = function (ev) {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight &&
          that.loading === false
        ) {
          that.loadMorePosts();
        }
      };
    },
    loadMorePosts() {
      this.$store.dispatch("getMorePosts");
    },
  },
  computed: {
    loading() {
      return this.$store.getters.getLoadingState;
    },
    error:{
      get(){
        return this.$store.getters.getError
      },
      set(){
        this.$store.dispatch('removeError')
      }
    }
  },
  mounted() {
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
  