<template>
  <div>
    <v-container fluid>
      <v-row>
        <CardLimit :cardLimit="cardLimit" />
        <ClearLocalStorage />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import CardLimit from "./CardLimit.vue";
import ClearLocalStorage from "./ClearLocalStorage.vue";

const SettingProps = Vue.extend({
  props: {
    cardLimit: String
  }
});

@Component({
  components: {
    CardLimit,
    ClearLocalStorage
  }
})
export default class Settings extends SettingProps {}
</script>

<style scoped>
</style>