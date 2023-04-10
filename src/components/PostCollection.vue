<template>
  <div>
    <create-post />
    <post
      v-for="post in posts"
      :key="post.id"
      v-bind="post.id"
      :content="post"
      :id="'post-' + post.id"
    ></post>
    <div class="d-flex justify-center">
      <v-progress-circular
        v-if="loading"
        indeterminate
        size="24"
        color="#00b0be"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import CreatePost from "./CreatePost.vue";
import Post from "./Post.vue";

export default {
  name: "PostCollection",
  props: {
    msg: String,
  },
  components: {
    CreatePost,
    Post
  },
  data() {
    return {};
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    loading() {
      return this.$store.getters.getLoadingState;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post-card {
  max-width: 600px;
  margin: 0 auto;
}

.title-and-date {
  margin-left: 16px;
}

.title {
  font-weight: bold;
}

.date {
  color: gray;
}

.avatar img {
  width: 40px;
  height: 40px;
}

.action-btn {
  color: gray;
}

.action-text {
  margin-left: 8px;
}
</style>
