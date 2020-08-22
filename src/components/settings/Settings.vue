<template>
  <div>
    <v-container fluid>
      <v-row>
        <ClearLocalStorage />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ClearLocalStorage from "./ClearLocalStorage.vue";

@Component({
  components: {
    ClearLocalStorage
  }
})
export default class Settings extends Vue {}
</script>

<style scoped>
</style>