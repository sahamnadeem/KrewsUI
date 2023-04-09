<template>
  <v-app id="inspire">
    <router-view />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      
    };
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
html {
  scroll-behavior: smooth;
}
</style>
