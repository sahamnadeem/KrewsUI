<template>
  <v-app-bar class="px-3" color="white" flat density="comfortable">
    <v-img
      class="mx-2"
      src="@/assets/logo.png"
      max-height="100"
      max-width="100"
      contain
    ></v-img>
    <v-spacer></v-spacer>

    <v-tabs centered color="grey-darken-2">
      <v-tab v-for="link in links" :key="link" :to="link.link">
        {{ link.name }}
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="white" elevation="2" class="bordered">
            <span class="text-h5">{{
              name.split(" ").shift().charAt(0) +
              name.split(" ").pop().charAt(0)
            }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="white" elevation="2" class="bordered">
              <span class="text-h5">{{
                name.split(" ").shift().charAt(0) +
                name.split(" ").pop().charAt(0)
              }}</span>
            </v-avatar>
            <h3>{{ name }}</h3>
            <p class="text-caption mt-1">{{ email }}</p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logout"> Logout </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBarComp",
  props: {
    links: Array,
  },
  computed: {
    name: () => {
      return JSON.parse(localStorage.getItem("user")).name;
    },
    email: () => {
      return JSON.parse(localStorage.getItem("user")).email;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.login-logo {
  width: 100px !important;
}
</style>