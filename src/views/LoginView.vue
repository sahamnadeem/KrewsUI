<template>
    <v-container fluid class="login-container">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="login-card">
            <v-img
              src="@/assets/twitter-logo.png"
              class="login-logo"
              alt="Twitter Logo"
            ></v-img>
            <v-card-title class="login-card-title"> Login </v-card-title>
            <v-card-text class="login-card-text">
              <v-form ref="loginForm" @submit.prevent="login" v-model="valid">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                  required
                  outlined
                  color="primary"
                  dense
                  class="login-form-field"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="passwordRules"
                  required
                  type="password"
                  outlined
                  color="primary"
                  dense
                  class="login-form-field"
                ></v-text-field>
                <v-btn
                  type="submit"
                  :loading="loading"
                  :disabled="!valid || loading"
                  color="primary"
                  block
                  class="login-button"
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
            </v-card-text>
          </v-card>
          <v-snackbar
            v-model="errorSnackbar"
            top
            right
            :timeout="snackbarTimeout"
            color="error"
          >
            {{ error }}
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
        snackbarTimeout: 5000,
        emailRules: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+/.test(v) || "Email must be valid",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
        ],
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
            // Handle successful login response
            console.log("Login successful:", response);
            // Save token and user object to local storage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            // Redirect to dashboard or perform other actions as needed
          })
          .catch((error) => {
            // Handle login error
            console.error("Login failed:", error);
            // Display error message to user
            this.error = "Failed to login. Please try again.";
            this.errorSnackbar = true;
            // Remove any prestored data if there is
            localStorage.removeItem("token")
            localStorage.removeItem("user")
          })
          .finally(() => {
            // Reset loading state
            this.loading = false;
            this.$router.push('/')
          });
      },
    },
  };
  </script>
    