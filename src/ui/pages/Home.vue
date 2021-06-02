<template>
  <v-container fill-height>
    <v-row
      v-if="!logged"
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col cols="4">
        <login @registerClick="dialog = true" />
        <v-dialog v-model="dialog" max-width="500">
          <register-user @registered="dialog = false" />
        </v-dialog>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col xs="12" lg="3">
        <my-watchlists @createWatchlist="watchlist_dialog = true"/>
      </v-col>
      <v-col xs="12" lg="9">
        <watchlist-details />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import MyWatchlists from "@/ui/components/watchlist/MyWatchlists.vue";
import WatchlistDetails from "../components/watchlist/WatchlistDetails.vue";
import Login from "../components/users/Login.vue";
import RegisterUser from "../components/users/RegisterUser.vue";

export default Vue.extend({
  components: { MyWatchlists, WatchlistDetails, Login, RegisterUser},
  data() {
    return {
      dialog: false,
      watchlist_dialog: false
    };
  },
  computed: {
    logged() {
      const token = localStorage.getItem("token");
      const user = this.$store.state.users.userData;
      return token != null && user.username !== "";
    },
  },
});
</script>

<style></style>
