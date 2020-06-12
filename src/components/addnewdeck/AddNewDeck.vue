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

<script>
import ImportDeckFromURL from "./ImportDeckFromURL.vue";
import ImportDeckFromFile from "./ImportDeckFromFile.vue";
import DeckCreator from "./DeckCreator.vue";
export default {
  name: "AddNewDeck",
  components: { ImportDeckFromURL, ImportDeckFromFile, DeckCreator }
};
</script>

<style scoped>
</style>