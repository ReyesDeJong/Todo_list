<template>
  <v-card>
    <v-card-title class="headline">Create New Watchlist</v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Title"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-card-subtitle>
                    <v-file-input label="Upload  CSV"></v-file-input>
                </v-card-subtitle>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="onCancelClick">Cancel</v-btn>

      <v-btn id="send" color="primary" text @click="onCreateClick"
        >Create</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionTypes } from "@/ui/store/watchlist/actions";

export default Vue.extend({
  data() {
    return {
      title: "",
      rules: [(v: string) => v.length > 0 || "Field can't be empty"],
    };
  },
  methods: {
    async onCreateClick() {
      const form: any = this.$refs.form;
      if (form.validate()) {

        this.$emit("created");
      }
    },
    onCancelClick() {
        this.$emit("canceled");
    }
  },
});
</script>

<style></style>
