<template>
  <v-col cols="12" sm="12" md="6" lg="4" xl="4">
    <v-card height="100%" raised>
      <v-card-title>Import Deck From URL</v-card-title>
      <v-card-text>
        <v-text-field
          class="deck-input"
          label="Provide a File URL"
          outlined
          clearable
          :rules="urlRules"
          v-model="chosenURL"
        >
          <v-icon slot="prepend">mdi-web</v-icon>
        </v-text-field>
      </v-card-text>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="indigo" right @click="loadFileFromURL">Import File</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ImportDeckFromURL",
  data() {
    return {
      chosenURL: null,
      fileContent: "",
      urlRules: [
        value =>
          new RegExp("^https://.*/.*.json$").exec(value) !== null ||
          "Please provide a correct URL"
      ]
    };
  },
  methods: {
    async loadFileFromURL() {
      try {
        const response = await fetch(this.chosenURL);
        const fileContent = await response.json();
        this.$eventHub.$emit("addDecksFromJSON", fileContent);
      } catch (error) {
        // console.log(error);
        // TODO: cors?!
        this.$eventHub.$emit("snackbarEvent", "An Error Occurred While Loading The File");
      }
    },
  }
};
</script>

<style scoped>
#file-input-wrapper {
  padding-bottom: 0;
}
.button-padding {
  padding: 16px;
}
</style>
