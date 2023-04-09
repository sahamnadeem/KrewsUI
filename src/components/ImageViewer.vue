<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-icon icon="mdi-close" @click="dialog = !dialog" class="close"></v-icon>
        <v-card-text>
          <v-container>
            <v-row class="justify-center">
                <div class="box-main">
                    <v-img :src="image"></v-img>
                </div>
            </v-row>
            <v-row class="justify-center" v-if="imageList">
                <div class="box ma-1" v-for="image,index in imageList" :key="index" @click="changeImage(image)">
                    <v-img :src="image.media_url" :width="50" :height="50" aspect-ratio="1/1" cover></v-img>
                </div>
            </v-row>
          </v-container>
          
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

  <script>
export default {
  data() {
    return {
      
    };
  },
  computed:{
    dialog:{
        get(){
            return this.$store.getters.getPopup
        },
        set(newValue){
            this.$store.dispatch('toggleImage')
        }
    },
    image(){
        return this.$store.getters.getImageSrc.media_url
    },
    imageList(){
        return this.$store.getters.getImageList
    }
  },
  methods:{
    changeImage(image){
        this.$store.dispatch('changeImage',image)
    }
  }
};
</script>

<style lang="scss" scoped>
.box{
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.box-main{
    width: 50vw;
    height: 70vh;
    margin: auto;
    display: flex;
}
.close{
    position: absolute;
    top:4%;
    right:3%;
    color:black;
}
</style>