<template>
  <div id="app">
    <v-window :touch="{ left: swipeLeft, right: swipeRight }">
      <v-app id="inspire">
        <v-app id="sandbox">
          <v-content>
            <NavigationBar
              ref="navbar"
              title="Fancy Flashcard"
              v-bind:decks="decks"
              v-bind:numberOfSelectedDecks="numberOfSelectedDecks"
              v-bind:navBarList="navBarList"
            ></NavigationBar>
            <router-view v-bind:decks="decks" v-bind:numberOfSelectedDecks="numberOfSelectedDecks" />
          </v-content>
        </v-app>
      </v-app>
    </v-window>
  </div>
</template>

<script>
import NavigationBar from "./components/layout/NavigationBar.vue";

export default {
  props: {
    title: String
  },
  components: {
    NavigationBar
  },
  data() {
    return {
      decks: [
        {
          id: 1,
          deckname: "Test Deck 1",
          selected: false
        },
        {
          id: 2,
          deckname: "Test Deck 2",
          selected: false
        }
      ],
      navBarList: [
        {
          to: "/",
          icon: "mdi-home",
          title: "Home"
        },
        {
          to: "/add",
          icon: "mdi-plus",
          title: "Add Deck"
        },
        {
          to: "/settings",
          icon: "mdi-cog",
          title: "Settings"
        },
        {
          to: "/about",
          icon: "mdi-information",
          title: "About"
        }
      ],
    };
  },
  computed: {
    numberOfSelectedDecks() {
      return this.decks.filter(deck => deck.selected).length;
    },
  },
  methods: {
    swipeLeft () {
      this.$refs.navbar.hideDrawer();
    },
    swipeRight () {
      this.$refs.navbar.showDrawer();
    },
  },
};
</script>

<style>
html,
body {
  /* apply dark mode to scrollbar in firefox desktop */
  background-color: #000;
}

#app {
  text-align: center;
}
.v-list {
  text-align: left;
}
</style>
