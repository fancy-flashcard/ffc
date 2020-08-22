<template>
  <div>
    <v-container fluid>
      <v-row>
        <MaxCardCount :maxCardCount="maxCardCount" />
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

const SettingProps = Vue.extend({
  props: {
    maxCardCount: String
  }
});

@Component({
  components: {
    MaxCardCount,
    ClearLocalStorage
  }
})
export default class Settings extends SettingProps {}
</script>

<style scoped>
</style>