<template>
  <div class="deckselection">
    <DeckSelection v-bind:decks="decks" v-bind:numberOfSelectedDecks="numberOfSelectedDecks"></DeckSelection>
  </div>
</template>

<script>
import DeckSelection from '../components/deckselection/DeckSelection.vue'
export default {
  name: 'App',
  props: {
    decks: Array,
    numberOfSelectedDecks: Number
  },
  computed: {
    
  },
  components: {
    DeckSelection
  },
}
</script>

<style>
</style>