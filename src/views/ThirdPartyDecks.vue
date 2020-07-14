<template>
  <div class="thirdpartydecks">
    <ThirdPartyDeckSelection />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ThirdPartyDeckSelection from "../components/thirdparty/ThirdPartyDeckSelection.vue";

@Component({
  components: {
    ThirdPartyDeckSelection
  }
})
export default class ThirdPartyDecks extends Vue {}
</script>

<style scoped>
</style>