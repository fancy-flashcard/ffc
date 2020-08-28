<template>
  <div class="DeckSelection">
    <v-subheader>Decks</v-subheader>
    <v-list v-if="decks.length > 0">
      <v-list-item-group multiple color="indigo" v-model="deckModel">
        <v-list-item v-for="deck in decks" :key="deck.id" :value="deck.id" :id="deck.id">
          <v-list-item-content>
            <v-list-item-title v-text="deck.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon
            :class="{ hidden: numberOfSelectedDecks===0, visible: numberOfSelectedDecks>0 }"
          >
            <v-icon v-if="deck.selected">mdi-check-box-outline</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <p v-else id="no-decks-yet-notice">
      You don't have any decks yet.
      You might want to add some by clicking on the button in the bottom right corner.
    </p>
    <v-btn
      class="mx-2"
      id="btn-fixed-bottom-right-corner"
      fab
      dark
      color="indigo"
      @click="onButtonClick"
    >
      <v-icon
        v-text="numberOfSelectedDecks === 0 ? 'mdi-plus' : 'mdi-navigation'"
        :class="{ 'rotate-90': numberOfSelectedDecks > 0 }"
      />
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Deck } from "../../types";

const DeckSelectionProps = Vue.extend({
  props: {
    decks: { type: Array as () => Deck[] },
    numberOfSelectedDecks: Number
  }
});

@Component
export default class DeckSelection extends DeckSelectionProps {
  get deckModel() {
    return this.decks
      .map(deck => (deck.selected ? deck.id : undefined))
      .filter(id => id !== undefined);
  }
  set deckModel(newModel) {
    this.decks.forEach(deck => {
      deck.selected = newModel.includes(deck.id);
    });
  }

  get selectedDeck() {
    return this.deckModel.length !== 1
      ? null
      : this.decks.find(deck => deck.id === this.deckModel[0]);
  }

  onButtonClick() {
    if (this.numberOfSelectedDecks === 0) {
      this.$router.push("add");
    } else {
      // start learning with selected decks
      this.$router.push("learn");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#btn-fixed-bottom-right-corner {
  position: fixed;
  bottom: 20px;
  right: 20px;
  margin: 0 !important;
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

#no-decks-yet-notice {
  padding: 0 16px;
}
</style>
