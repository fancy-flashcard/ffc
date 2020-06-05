<template>
  <div class="settings">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-card class="file-input" width="600" height="300" raised>
            <v-card-title>Deck-Import</v-card-title>
            <br />
            <v-card-text>
              <v-file-input
                accept=".json"
                label="Click here to select a .json file"
                outlined
                v-model="chosenFile"
              ></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn right @click="importFile">Import File</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-card class="file-input" width="600" height="300" raised>
            <v-card-title>Deck-Creation</v-card-title>
            <br />
            <p>You will be able to natively create a new deck here.</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AddNewDeck",
  data() {
    return {
      chosenFile: null,
      fileContent: ""
    };
  },
  computed: {},
  components: {},
  methods: {
    importFile() {
      const reader = new FileReader();
      reader.readAsText(this.chosenFile);
      reader.onload = () => {
        this.fileContent = JSON.parse(reader.result);
        if (this.fileContent.decks) {
          localStorage.setItem("decks", JSON.stringify(this.fileContent.decks));
        }
      };
    }
  }
};
</script>

<style scoped>
.file-input {
  margin: auto;
  width: 50%;
}
</style>