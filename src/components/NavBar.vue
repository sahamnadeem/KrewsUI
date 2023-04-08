<template>
  <v-app-bar class="px-3" color="white" flat density="comfortable">

    <v-spacer></v-spacer>

    <v-tabs centered color="grey-darken-2">
      <v-tab v-for="link in links" :key="link"  :to="link.link"> 
        {{ link.name }}
      </v-tab>
      
    </v-tabs>
    <v-spacer></v-spacer>

    <v-avatar
      class="hidden-sm-and-down"
      color="grey-darken-1"
      size="32"
    ></v-avatar>
  </v-app-bar>
</template>

<script>
export default {
    name: "NavBarComp",
    props:{
        links:Array,
    }
};
</script>