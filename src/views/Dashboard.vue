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
  beforeCreate() {
    this.$store.dispatch('getPosts')
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
  