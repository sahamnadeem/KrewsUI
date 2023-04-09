<template>
  <div class="home">
    <PostCollection />
  </div>
</template>

<script>
import PostCollection from '@/components/PostCollection.vue';

export default {
  name: "HomeView",
  components: {
    PostCollection
  }
};
</script>