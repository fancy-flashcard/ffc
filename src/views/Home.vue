<template>
  <div class="deckselection">
    <DeckSelection v-bind:decks="decks"></DeckSelection>
  </div>
</template>

<script>
import DeckSelection from '../components/deckselection/DeckSelection.vue'
export default {
  name: 'App',
  components: {
    DeckSelection
  },
  data() {
    return {
      decks: [
        {
          id: 1,
          deckname: "Test1"
        },
        {
          id: 2,
          deckname: "Test2"
        }
      ]
    };
  },
}
</script>

<style>
</style>