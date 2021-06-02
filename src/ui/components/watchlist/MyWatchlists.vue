<template>
  <v-card>
    <v-list>
      <v-subheader>My Watchlists</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in watchlists" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-btn @click="clickCreateWatchlist" color="primary" absolute bottom right fab>
      
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-list>
    <v-dialog v-model="watchlist_dialog" max-width="500">
      <create-watchlist @canceled="watchlist_dialog = false"/>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionTypes } from "@/ui/store/watchlist/actions";
import CreateWatchlist from "@/ui/components/watchlist/CreateWatchlist"
export default Vue.extend({
  components: { CreateWatchlist },
  data: () => ({
    selectedItem: 1,
    watchlist_dialog: false,
  }),
  async mounted() {
    await this.$store.dispatch("watchlists/" + ActionTypes.getAllWatchlists);
  },
  computed: {
    watchlists() {
      return this.$store.state.watchlists.watchlists;
    },
  },
  methods: {
    clickCreateWatchlist() {
      this.watchlist_dialog = true;
    }
  }
});
</script>

<style></style>
