<template>
    <div class="h-100">
        <v-row class="justify-center align-center h-100">
            <div class="center-error">
                <v-img class="floating-img" src="../assets/krews.png" :height="400" :width="200"></v-img>
                <h1>Opssss......! Page Not Found</h1>
                <br/>
                <v-btn 
                    color="#00b0be"
                    dark
                    class="login-button text-white ma-auto" @click="goHome">
                    Go Home
                </v-btn>
            </div>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goHome(){
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
.center-error{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@keyframes float {
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-20px);
	}
	100% {
		transform: translatey(0px);
	}
}
.floating-img{
    transform: translatey(0px);
	animation: float 5s ease-in-out infinite;
}
</style>