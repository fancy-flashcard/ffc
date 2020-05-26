<template>
  <div class="DeckSelection">
    <v-subheader>Decks</v-subheader>
    <v-list>
      <v-list-item-group multiple color="indigo">
        <v-list-item
          v-for="deck in decks"
          :key="deck.id"
          v-model="deck.selected"
        >
          <v-list-item-content>
            <v-list-item-title v-text="deck.deckname"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon v-bind:class="{ hidden: getNumberOfSelectedDecks()===0, visible: getNumberOfSelectedDecks()>0 }">
            <v-icon v-if="deck.selected">mdi-check-box-outline</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn class="mx-2" fab dark color="indigo">
      <v-icon v-if="getNumberOfSelectedDecks()>0" class="rotate-90">mdi-navigation</v-icon>
      <v-icon v-else>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "DeckSelection",
  created: function () {
    this.$eventHub.$on("clearDeckSelection", () => {
      this.setSelectedStateOfAllDecks(false);
    });
    this.$eventHub.$on("selectAllDecks", () => {
      this.setSelectedStateOfAllDecks(true);
    });
  },
  props: {
    decks: Array
  },
  methods: {
    getNumberOfSelectedDecks () {
      let numberOfSelectedDecks = 0;
      for (let deck of this.decks) {
        if (deck.selected) numberOfSelectedDecks++;
      }
      this.$eventHub.$emit("numberOfSelectedDecks", numberOfSelectedDecks);
      return numberOfSelectedDecks;
    },
    setSelectedStateOfAllDecks (state) {
      for (let deck of this.decks) {
        deck.selected = state;
      }
    },
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

.hidden {
  opacity: 0;
  transition: 0.2s;
}
.visible {
  opacity: 1;
  transition: 0.2s;
}

.rotate-90 {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
