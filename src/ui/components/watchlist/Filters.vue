<template>
  <v-container>
    <v-row>
      <v-col xs="12">
        <target-list />
      </v-col>
      <v-col xs="12">
        <v-row>
          <v-col>
            <v-text-field label="Name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Ra"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Dec"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Radius"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary">Save</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import TargetList from "./TargetList.vue";
export default Vue.extend({
  components: { TargetList },
  data() {
    return {
      targets: ["galaxia1", "galaxia2"],
    };
  },
});
</script>

<style></style>
