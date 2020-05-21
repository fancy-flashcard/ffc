<template>
  <div id="app">
    <DeckSelection title="Fancy Flashcard" v-bind:decks="decks"></DeckSelection>
  </div>
</template>

<script>
import DeckSelection from './components/deckselection/DeckSelection.vue'

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
