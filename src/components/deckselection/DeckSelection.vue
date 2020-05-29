<template>
  <div class="DeckSelection">
    <v-subheader>Decks</v-subheader>
    <v-list>
      <v-list-item-group multiple color="indigo" v-model="deckModel">
        <v-list-item
          v-for="deck in decks"
          :key="deck.id"
          :value="deck.id"
          :id="deck.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="deck.deckname"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon v-bind:class="{ hidden: numberOfSelectedDecks===0, visible: numberOfSelectedDecks>0 }">
            <v-icon v-if="deck.selected">mdi-check-box-outline</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn class="mx-2" fab dark color="indigo">
      <v-icon
        v-text="numberOfSelectedDecks === 0 ? 'mdi-plus' : 'mdi-navigation'"
        :class="{ 'rotate-90': numberOfSelectedDecks > 0 }" />
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "DeckSelection",
  props: {
    decks: Array,
    numberOfSelectedDecks: Number,
  },
  computed: {
    deckModel: {
      get () {
        return this.decks.map((deck) => deck.selected ? deck.id : undefined).filter((id) => id !== undefined);
      },
      set (newModel) {
        this.decks.forEach((deck) => {
          deck.selected = newModel.includes(deck.id);
        });
      }
    }
  }
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
