<template>
  <div class="DeckSelection">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-card>
            <v-card-text>
              <v-btn text>Löschen</v-btn>
              <v-btn text>Neues Deck hinzufügen</v-btn>
              <Deck v-for="deck in decks" :key="deck.id" v-bind:deckname="deck.deckname"></Deck>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary">Starten</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Deck from "./Deck.vue";

export default {
  name: "DeckSelection",
  props: {
    decks: Array
  },
  components: {
    Deck
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
