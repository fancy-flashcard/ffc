<template>
  <div class="deckselection">
    <DeckSelection :decks="decks" :numberOfSelectedDecks="numberOfSelectedDecks"></DeckSelection>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Deck } from "../types";

import DeckSelection from "../components/deckselection/DeckSelection.vue";

const HomeProps = Vue.extend({
  props: {
    decks: {type: Array as () => Deck[]},
    numberOfSelectedDecks: Number
  }
});

@Component({
  components: {
    DeckSelection
  }
})
export default class Home extends HomeProps {}
</script>

<style>
</style>