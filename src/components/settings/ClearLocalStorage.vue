<template>
  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
    <v-card height="100%" raised>
      <v-card-title>Clear Local Storage</v-card-title>
      <v-card-text>
        <p>Delete all imported decks as well as your learning progess in the app.</p>
      </v-card-text>
      <div class="horizontal-spacer"></div>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="red" @click="clearLocalStorage" right>Clear Local Storage</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import * as clearStorageDialogHelper from "../../helpers/clearStorageDialogHelper";

@Component
export default class ClearLocalStorage extends Vue {
  clearLocalStorage() {
    clearStorageDialogHelper.clearLocalStorageDialog(this);
  }
}
</script>

<style scoped>
.button-padding {
  padding: 16px;
}
.v-card {
  display: flex;
  flex-direction: column;
}
.horizontal-spacer {
  flex-grow: 1;
}
</style>
