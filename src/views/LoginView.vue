<template>
  <v-container fluid class="login-container ma-auto">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="login-card">
          <v-img
            src="@/assets/logo.png"
            class="login-logo"
            alt="Twitter Logo"
          ></v-img>
          <v-card-title class="login-card-title text-center"> Login </v-card-title>
          <v-card-text class="login-card-text">
            <v-form ref="loginForm" @submit.prevent="login" v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                required
                outlined
                color="#00b0be"
                dense
                class="login-form-field mb-1"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                required
                type="password"
                outlined
                color="#00b0be"
                dense
                class="login-form-field mb-1"
              ></v-text-field>
              <v-btn
                type="submit"
                :loading="loading"
                :disabled="!valid || loading"
                color="#00b0be"
                block
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
                <template v-else> Login </template>
              </v-btn>
            </v-form>
            <br/>
            <div class="text-center">Don't have an account? Don't worry <router-link to="/signup">Signup</router-link> here</div>
          </v-card-text>
        </v-card>
        <v-snackbar
          v-model="errorSnackbar"
          :timeout="snackbarTimeout"
          color="error"
          location="top right"
        >
          <div class="text-subtitle-1 pb-2">
            <b>Error Occured During Login</b>
          </div>
          <p>{{ error }}</p>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import axios from "axios";
import { API_BASE_URL } from "@/libs/config";

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      loading: false,
      error: "",
      errorSnackbar: false,
      snackbarTimeout: 3000,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid e-mail.";
        },
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login() {
      // Reset error and loading state
      this.error = "";
      this.loading = true;

      // Perform login using Axios with API_BASE_URL
      axios
        .post(API_BASE_URL + "login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Save token and user object to local storage and state store
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.$store.dispatch('store_auth', response.data)
          //Route user to home page
          this.$router.push("/");
        })
        .catch((error) => {
          // Display error message to user
          this.error = error.response.data.message;
          this.errorSnackbar = true;
          // Remove any prestored data if there is
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .finally(() => {
          // Reset loading state
          this.loading = false;
        });
    },
    signup(){
      //Route user to Signup page
      this.$router.push('/signup')
    }
  },
};
</script>