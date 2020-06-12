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
            <v-snackbar app v-model="snackbar.snackbar" :timeout="snackbar.timeout">
              {{ snackbar.text }}
              <template>
                <v-btn color="indigo" text @click="snackbar.snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
          </v-content>
        </v-app>
      </v-app>
    </v-window>
  </div>
</template>

<script>
import NavigationBar from "./components/layout/NavigationBar.vue";
import ls from "./helpers/localStorageHelper";

export default {
  props: {
    title: String
  },
  components: {
    NavigationBar
  },
  created() {
    this.$eventHub.$on("deleteDecks", decksToBeDeleted => {
      this.decks = this.decks.filter(
        deck => !decksToBeDeleted.includes(deck.id)
      );
    });
    this.$eventHub.$on("addDecksFromFile", fileContent => {
      this.addDecksFromFile(fileContent);
    });
    this.$eventHub.$on("snackbarEvent", output => {
      this.showSnackbar(output);
    });
  },
  data() {
    return {
      propertiesToSyncWithLocalStorage: [{ key: "decks", defaultValue: [] }],
      decks: [],
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
      snackbar: {
        text: "",
        snackbar: false,
        timeout: 2000
      }
    };
  },
  mounted() {
    this.readFromLocalStorage();
  },
  computed: {
    numberOfSelectedDecks() {
      return this.decks.filter(deck => deck.selected).length;
    }
  },
  methods: {
    swipeLeft() {
      if (this.$route.name === "Learn") {
        return;
      }
      this.$refs.navbar.hideDrawer();
    },
    swipeRight() {
      if (this.$route.name === "Learn") {
        return;
      }
      this.$refs.navbar.showDrawer();
    },
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.snackbar = true;
    },
    readFromLocalStorage() {
      this.propertiesToSyncWithLocalStorage.forEach(item => {
        try {
          this[item.key] = JSON.parse(ls.get(item.key));
          if (this[item.key] === null) {
            throw new Error("No item found.");
          }
        } catch (e) {
          this[item.key] = item.defaultValue;
        }
      });
    },
    saveToLocalStorge() {
      this.propertiesToSyncWithLocalStorage.forEach(item => {
        ls.set(item.key, JSON.stringify(this[item.key]));
      });
    },
    addDecksFromFile(fileContent) {
      // TODO: check how many decks and cards were imported -> throw error if none
      try {
        fileContent = JSON.parse(fileContent);
        for (const deckShortName in fileContent.decks) {
          const cards = [];
          for (const cardId in fileContent.decks[deckShortName].cards) {
            cards.push({
              id: Number(cardId),
              q: fileContent.decks[deckShortName].cards[cardId].q,
              a: fileContent.decks[deckShortName].cards[cardId].a,
              r: []
            });
          }

          this.decks.push({
            id: this.decks.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1,
            selected: false,
            name:
              fileContent.decks[deckShortName].meta.deck_name || deckShortName,
            meta: {
              file: fileContent.meta,
              deck: {
                ...fileContent.decks[deckShortName].meta,
                short_name: deckShortName
              }
            },
            cards
          });
        }
        this.saveToLocalStorge();
        this.showSnackbar("Imported decks");
      } catch (e) {
        this.showSnackbar(e);
      }
    }
  }
};
</script>

<style>
html,
body {
  /* apply dark mode to scrollbar in firefox desktop */
  background-color: #000;
  /* remove scrollbar on desktop when not needed */
  overflow-y: auto !important;
}

/* reduce margin of file input */
.deck-input .v-input__control .v-input__slot {
  margin-bottom: 0;
}
.deck-input .v-input__control .v-text-field__details {
  display: none;
}
</style>
