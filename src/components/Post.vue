<template>
  <v-card class="ma-auto mb-5" color="#00b0be" theme="dark" max-width="600">
    <v-menu absolute v-if="content.user_id === user.id || user.is_admin">
      <template v-slot:activator="{ props }">
        <v-icon
          class="float-right ma-3"
          icon="mdi-dots-vertical"
          v-bind="props"
        ></v-icon>
      </template>
      <v-list theme="light">
        <v-list-item value="edit" v-if="content.user_id === user.id" @click="edit(content)">
          <v-list-item-title
            ><v-icon icon="mdi-pencil" size="small" color="grey"></v-icon>
            Edit</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          value="delete"
          v-if="content.user_id === user.id || user.is_admin"
        >
          <v-list-item-title @click="deletePost"
            ><v-icon icon="mdi-delete" size="small" color="grey"></v-icon>
            Delete</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card-item :title="content.title">
      <template v-slot:subtitle>
        <v-icon icon="mdi-clock" size="18" color="white" class="pb-1"></v-icon>

        {{ content.created_at }}
      </template>
    </v-card-item>

    <v-card-text class="text-h5 py-2">
      {{ content.content }}
      <br />
      <br />
      <div
        class="multi-img"
        @click="openImage"
        v-if="content.images.length > 0"
      >
        <v-img
          class="bg-white"
          width="150"
          :aspect-ratio="1"
          :src="content.images[0].media_url"
          cover
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-img>
        <div class="overlay" v-if="content.images.length > 1"></div>
        <div class="overlay-number" v-if="content.images.length > 1">
          +{{ content.images.length - 1 }}
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar color="white" class="bordered">
            <span class="text-h5">{{
              content.user.name.split(" ").shift().charAt(0) +
              content.user.name.split(" ").pop().charAt(0)
            }}</span>
          </v-avatar>
        </template>

        <v-list-item-title>{{ content.user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ content.user.email }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
    <div class="overlay" v-if="loading">
      <template v-if="loading">
        <v-progress-circular
          indeterminate
          size="24"
          color="white"
        ></v-progress-circular>
      </template>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import { API_BASE_URL, getHeaders } from "@/libs/config";
import { load } from "webfontloader";

export default {
  props: {
    content: Object,
  },
  data() {
    return {
      index: null,
      loading: false,
    };
  },
  methods: {
    deletePost() {
      if (confirm("Areyyou sure! you want to delete this post?") == true) {
        this.loading = true;
        axios
        .delete(API_BASE_URL + "post/" + this.content.id, getHeaders())
        .then((response) => {
          this.$store.dispatch("deletePost", this.content);
        })
        .catch((error) => {
          // Display error message to user
          this.$store.dispatch("setError", {
            state: true,
            timeout: 5000,
            title: "Can not update post",
            message: error.response.data.message,
          });
        })
        .finally(() => {
          // Reset loading state
          this.loading = false;
        });
      }
    },
    edit:function(post){
      window.scrollTo(0,0);
      this.$store.dispatch("editPost", post);
    },
    openImage(){
      this.$store.dispatch("toggleImage", this.content);
    }
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    images() {
      return this.content.images.map((image) => {
        return image.media_url;
      });
    },
  },
};
</script>

<style lang="scss">
.multi-img {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  top: 0;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  align-items: center;
}
.v-card .v-card-text {
  line-height: 1.5rem !important;
}
.overlay-number {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  align-items: center;
}
</style>