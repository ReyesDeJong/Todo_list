<template>
  <v-card>
    <v-card-title>Targets</v-card-title>
    <v-card-subtitle>
      <v-file-input label="Upload  CSV"></v-file-input>
    </v-card-subtitle>
    <v-virtual-scroll :bench="0" :items="items" height="500" item-height="64">
      <template v-slot:default="{ item }">
        <v-list-item
          :key="item.text"
          @click="onItemClick"
          :input-value="item.selected"
          color="primary"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <v-card-text style="height: 10px; position: relative">
      <v-btn color="primary" dark absolute top right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    items: [],
  }),
  mounted() {
    const ret = [];
    for (let i = 1; i < 100; i++) {
      ret.push({ text: "Target" + i, selected: false });
    }
    this.items = ret;
  },
  methods: {
    onItemClick(item) {
      console.log(item.target.innerText);
      this.items.map((x) => {
        console.log(x.text !== item.target.innerText);
        if (x.text !== item.target.innerText) {
          x.selected = false;
        } else {
          x.selected = true;
        }
      });
    },
  },
});
</script>

<style></style>
