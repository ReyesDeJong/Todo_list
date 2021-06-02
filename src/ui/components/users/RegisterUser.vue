<template>
  <v-card>
    <v-card-title class="headline">Register New User</v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="First Name"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="institution"
                label="Institution"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="role"
                label="Role"
                :items="roles"
                :rules="rules"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="dialog = false">Cancel</v-btn>

      <v-btn id="send" color="primary" text @click="onRegisterClick"
        >Send</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionTypes, RegisterInput } from "@/ui/store/user/actions";
export default Vue.extend({
  data() {
    return {
      username: "",
      name: "",
      email: "",
      lastName: "",
      password: "",
      institution: "",
      role: "",
      roles: ["Researcher"],
      showPassword: false,
      rules: [(v: string) => v.length > 0 || "Field can't be empty"],
    };
  },
  methods: {
    async onRegisterClick() {
      const form: any = this.$refs.form;
      if (form.validate()) {
        const userInput: RegisterInput = {
          username: this.username,
          name: this.name,
          email: this.email,
          lastName: this.lastName,
          password: this.password,
          institution: this.institution,
          role: this.role,
        };
        await this.$store.dispatch(
          "users/" + ActionTypes.registerUser,
          userInput
        );
        this.$emit("registered");
      }
    },
  },
});
</script>

<style></style>
