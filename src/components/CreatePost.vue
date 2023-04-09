<template>
  <v-card
    max-width="600"
    class="ma-auto mb-5 pa-3"
    :title="postTitle"
    subtitle="Create someting that tells about you!"
    elevation="2"
    append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
  >
    <v-text-field v-model="title" label="Title"></v-text-field>
    <v-textarea
      v-model="content"
      placeholder="Write something here..."
    ></v-textarea>

    <div
      v-for="(url, index) in urls"
      :key="index"
      class="position-relative image-block"
    >
      <v-img :width="80" :height="80" aspect-ratio="1/1" cover :src="url">
      </v-img>
      <div class="overlay"></div>
      <div class="overlay-number" @click="removeImage(index)">
        <v-icon icon="mdi-close"></v-icon>
      </div>
    </div>

    <div class="position-relative image-block uploader" v-if="disUploader">
      <div class="overlay-number plus-icon" @click="$refs.file.click()">
        <v-icon icon="mdi-plus"></v-icon>
        <v-file-input
          @change="onFileChange"
          ref="file"
          :rules="rules"
          style="display: none"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an image"
          multiple
          prepend-icon="mdi-camera"
          :show-size="1000"
        ></v-file-input>
      </div>
    </div>

    <v-row class="ma-3">
      <v-spacer></v-spacer>
      <v-btn
        v-if="content && title && !isUpdate"
        :loading="loading"
        @click="postNow"
        color="#00b0be"
        dark
        class="login-button text-white"
      >
        <template v-if="loading">
          <v-progress-circular
            indeterminate
            size="24"
            color="white"
          ></v-progress-circular>
        </template>
        <template v-else> POST </template>
      </v-btn>
      <v-btn
        v-if="content && title && isUpdate"
        :loading="loading"
        @click="update"
        color="#00b0be"
        dark
        class="login-button text-white ma-1"
      >
        <template v-if="loading">
          <v-progress-circular
            indeterminate
            size="24"
            color="white"
          ></v-progress-circular>
        </template>
        <template v-else> POST </template>
      </v-btn>
      <v-btn
        v-if="isUpdate"
        @click="clear"
        color="warning"
        dark
        class="login-button text-white ma-1"
      >
        Clear
      </v-btn>
    </v-row>
  </v-card>
</template>
  
<script>
import axios from "axios";
import { API_BASE_URL, getHeaders } from "@/libs/config";

export default {
  data() {
    return {
      content: "",
      title: "",
      urls: [],
      files: [],
      disUploader: true,
      form: new FormData(),
      loading: false,
      rules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "Image size should be less than 2 MB!"
          );
        },
      ],
    };
  },
  methods: {
    removeImage(index) {
      this.urls.splice(index, 1);
    },
    onFileChange(e) {
      debugger;
      for (let i = 0; i < Object.keys(e.target.files).length; i++) {
        this.urls.push(URL.createObjectURL(e.target.files[i]));
      }
    },
    postNow: function () {
      let form = new FormData();
      this.loading = true;

      form.append("title", this.title);
      form.append("content", this.content);

      debugger;
      this.convertBlobToFiles(this.urls, (files) => {
        // Append the File objects to the FormData object with the name 'images[]'
        if (files) {
          console.log(files);
          files.forEach((file, index) => {
            form.append("images[]", file);
          });
        }
        // Now you can use the formData object to perform other operations, such as sending it in a form submission or an AJAX request.
        axios
          .post(API_BASE_URL + "post", form, getHeaders())
          .then((response) => {
            this.$store.dispatch("addPost", response.data)
            .then(()=>{
                document.getElementById("post-"+response.data.post.id).scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
              });
            })
          })
          .catch((error) => {
            // Display error message to user
            this.error = error.response.data.message;
            this.errorSnackbar = true;
          })
          .finally(() => {
            // Reset loading state
            this.loading = false;
            this.clear();
          });
      });
    },
    convertBlobToFiles: (blobUrls, callback) => {
      let files = [];
      let convertedCount = 0;
      if (blobUrls.length === 0) {
        callback(null);
      }
      blobUrls.forEach((blobUrl, index) => {
        // Fetch the Blob from the Blob URL
        fetch(blobUrl)
          .then((response) => response.blob())
          .then((blob) => {
            // Convert the Blob to a File object
            const file = new File([blob], `image_${index + 1}.png`, {
              type: blob.type,
            });
            files.push(file);
            convertedCount++;
            // If all Blobs are converted, trigger the callback with the array of File objects
            if (convertedCount === blobUrls.length) {
              callback(files);
            }
          })
          .catch((error) => {
            console.error("Error fetching Blob:", error);
          });
      });
    },
    update: function () {
      this.loading = true;
      let current_id = this.editPost.id
      axios
        .put(
          API_BASE_URL + "post/"+current_id,
          { title: this.title, content: this.content },
          getHeaders()
        )
        .then((response) => {
          console.log(response)
          this.$store.dispatch("deletePost", this.editPost)
          .then(()=>{
            this.$store.dispatch("addPost", response.data);
          })
          .then(()=>{
            document.getElementById("post-"+current_id).scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center"
            });
          })
        })
        .catch((error) => {
          // Display error message to user
          this.error = error.response.data.message;
          this.errorSnackbar = true;
        })
        .finally(() => {
          // Reset loading state
          this.loading = false;
          this.clear();
        });
    },
    clear() {
      this.$store.dispatch("clearUpdate");
      this.title = "";
      this.content = "";
      this.urls = [];
      this.disUploader = true;
    },
  },
  computed: {
    isUpdate() {
      return this.$store.getters.getIsUpdate;
    },
    editPost() {
      return this.$store.getters.getEditPost;
    },
    postTitle() {
      if (this.isUpdate) {
        return "Update your Post";
      }
      return "Create a Post";
    },
  },
  watch: {
    editPost(newVal, oldVal) {
      if (newVal) {
        this.title = newVal.title;
        this.content = newVal.content;
        this.disUploader = false;
      }
    },
  },
};
</script>
  
<style scoped lang="scss">
.image-block {
  width: 80px;
  height: 80px;
  display: inline-block;
  margin-right: 10px;
  &:hover .overlay {
    display: block;
  }
  &:hover .overlay-number {
    display: flex;
  }
}
.overlay {
  transition: all 0.4s ease-in-out;
  display: none;
}
.overlay-number {
  display: none;
  color: white;
  margin: auto;
  font-size: 1.5rem;
  cursor: pointer;
}
.plus-icon {
  display: flex !important;
  color: grey;
}
.uploader {
  border: 1px dotted grey;
}
</style>