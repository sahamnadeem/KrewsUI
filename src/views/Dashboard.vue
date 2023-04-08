<template>
  <v-app id="inspire">
    <nav-bar :links="links"></nav-bar>
    <router-view />
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
        },
        {
          name: "Profile",
          link: "/profile",
        },
      ],
    };
  },
  methods: {
    onScroll() {
      const that = this;
      window.onscroll = function (ev) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && that.loading === false) {
          that.loadMorePosts();
        }
      };
    },
    loadMorePosts() {
      this.$store.dispatch("getMorePosts");
    },
  },
  computed: {
    loading(){
      return this.$store.getters.getLoadingState
    }
  },
  beforeCreate() {
    this.$store.dispatch("getPosts");
  },
  mounted() {
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
  