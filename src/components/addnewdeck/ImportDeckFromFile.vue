<template>
  <v-col cols="12" sm="12" md="6" lg="4" xl="4">
    <v-card height="100%" raised>
      <v-card-title>Import a JSON File</v-card-title>
      <v-card-text>
        <v-file-input
          class="deck-input"
          outlined
          clearable
          label="Select a JSON File"
          accept=".json"
          v-model="chosenFile"
        ></v-file-input>
      </v-card-text>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="indigo" right @click="importFile">Import File</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ImportDeckFromFile extends Vue {
  chosenFile: File | null = null;
  fileContent = "";
  importFile() {
    const reader = new FileReader();
    try {
      if (this.chosenFile === null) {
        throw new Error("No file chosen.");
      }
      if (
        this.chosenFile.name.substr(this.chosenFile.name.length - 5) !== ".json"
      ) {
        throw new Error("Wrong file format!");
      }
      reader.readAsText(this.chosenFile);
      reader.onload = () => {
        this.$eventHub.$emit("addDecksFromFile", reader.result);
      };
    } catch (e) {
      this.$eventHub.$emit("snackbarEvent", e);
    }
  }
}
</script>

<style scoped>
#file-input-wrapper {
  padding-bottom: 0;
}
.button-padding {
  padding: 16px;
}
</style>
