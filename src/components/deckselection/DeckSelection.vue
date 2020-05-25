<template>
  <div class="DeckSelection">
    <v-subheader>Decks</v-subheader>
    <v-list>
      <v-list-item-group v-model="model" multiple color="indigo">
        <v-list-item
          v-for="(deck, i) in decks"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="deck.deckname"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon v-if="deck.selected">mdi-check-box-outline</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn class="mx-2" fab dark color="indigo">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "DeckSelection",
  props: {
    decks: Array
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
