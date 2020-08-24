<template>
  <div class="settings">
    <SettingsComponent :cardLimit="cardLimit" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SettingsComponent from "../components/settings/Settings.vue";

const SettingProps = Vue.extend({
  props: {
    cardLimit: String
  }
});

@Component({
  components: {
    SettingsComponent
  }
})
export default class Settings extends SettingProps {}
</script>

<style scoped>
</style>