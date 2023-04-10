<template>
  <div class="home">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="3"> </v-col>

          <v-col cols="12" sm="7">
            <PostCollection />
          </v-col>

          <v-col cols="12" sm="2"> </v-col>
        </v-row>
      </v-container>
      <ImageViewer />
    </v-main>
  </div>
</template>

<script>
import PostCollection from "@/components/PostCollection.vue";
import ImageViewer from "@/components/ImageViewer.vue";

export default {
  name: "HomeView",
  components: {
    PostCollection,
    ImageViewer
  },
};
</script>