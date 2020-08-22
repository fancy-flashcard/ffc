<template>
  <div>
    <v-container fluid>
      <v-row>
        <MaxCardCount />
        <ClearLocalStorage />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import MaxCardCount from "./MaxCardCountCard.vue";
import ClearLocalStorage from "./ClearLocalStorage.vue";

@Component({
  components: {
    MaxCardCount,
    ClearLocalStorage
  }
})
export default class Settings extends Vue {}
</script>

<style scoped>
</style>