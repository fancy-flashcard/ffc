<template>
  <div class="settings">
    <v-container fluid>
      <v-row>
        <ImportDeckFromURL />
        <ImportDeckFromFile />
        <DeckCreator />
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ImportDeckFromURL from "./ImportDeckFromURL.vue";
import ImportDeckFromFile from "./ImportDeckFromFile.vue";
import DeckCreator from "./DeckCreator.vue";

@Component({
  components: {
    ImportDeckFromURL,
    ImportDeckFromFile,
    DeckCreator
  }
})
export default class AddNewDeck extends Vue {}
</script>

<style scoped>
</style>