<template>
  <div class="DeckSelection">
    <TitleBar v-bind:title="title"></TitleBar>
    <button>Löschen</button>
    <button>Neues Deck hinzufügen</button>
    <form action="/">
      <Deck v-for="deck in decks" :key="deck.id" v-bind:deckname="deck.deckname"></Deck>
      <input type="submit" value="Starten" />
    </form>
    <hr>
    <router-link to="/about">Example Routing - About</router-link>
  </div>
</template>

<script>
import TitleBar from "../layout/TitleBar.vue";
import Deck from "./Deck.vue";

export default {
  name: "DeckSelection",
  props: {
    title: String,
    decks: Array
  },
  components: {
    TitleBar,
    Deck
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
