<template>
  <div class="settings">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <span class="title">Settings</span>
          <br />
          <v-btn color="red" @click="clearLocalStorage" class="my-4">Clear Local Storage</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Event } from "../types";

@Component
export default class Settings extends Vue {
  clearLocalStorage() {
    this.$eventHub.$emit(Event.CLEAR_LOCAL_STORAGE);
  }
}
</script>

<style scoped>
.settings {
  text-align: center;
}
</style>