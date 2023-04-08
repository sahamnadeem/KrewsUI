<template>
  <v-app-bar class="px-3" color="white" flat density="comfortable">
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
          <v-avatar>
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar>
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              ></v-img>
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
  computed:{
    name:() => {
      return JSON.parse(localStorage.getItem('user')).name
    },
    email:() => {
      return JSON.parse(localStorage.getItem('user')).email
    },
  },
  methods:{
    logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      this.$router.push('/login')
    }
  }
};
</script>