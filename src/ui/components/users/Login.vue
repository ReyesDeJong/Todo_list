<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="username"
                label="Username"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn id="login" color="primary" block @click="onLoginClick"
                >Login</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                id="register"
                color="primary"
                block
                @click="$emit('registerClick')"
                >Register</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ActionTypes } from "@/ui/store/user/actions";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      rules: [(v: string) => v.length > 0 || "Field can't be empty"],
    };
  },
  methods: {
    onLoginClick() {
      const form: any = this.$refs.form;
      if (form.validate()) {
        const userInput = {
          username: this.username,
          password: this.password,
        };
        this.$store.dispatch("users/" + ActionTypes.login, userInput);
      }
    },
  },
});
</script>

<style></style>
