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
            <CustomDialog ref="customDialog" />
          </v-content>
        </v-app>
      </v-app>
    </v-window>
  </div>
</template>

<script>
import NavigationBar from "./components/layout/NavigationBar.vue";
import CustomDialog from "./components/customdialog/CustomDialog.vue";
import {
  readFromLocalStorage,
  saveToLocalStorage,
  clearLocalStorage
} from "./helpers/localStorageHelper";
import { addDecksFromFile, addDecksFromJSON } from "./helpers/addDecksHelper";

const DEFAULT_SNACKBAR_TIMEOUT = 2000;

export default {
  props: {
    title: String
  },
  components: {
    NavigationBar,
    CustomDialog
  },
  created() {
    this.$eventHub.$on("deleteDecks", decksToBeDeleted => {
      this.decks = this.decks.filter(
        deck => !decksToBeDeleted.includes(deck.id)
      );
    });
    this.$eventHub.$on("addDecksFromFile", fileContent => {
      addDecksFromFile(this, fileContent);
    });
    this.$eventHub.$on("addDecksFromJSON", fileContent => {
      addDecksFromJSON(this, fileContent);
    });
    this.$eventHub.$on("snackbarEvent", output => {
      this.showSnackbar(output);
    });
    this.$eventHub.$on("clearLocalStorage", () => {
      clearLocalStorage(this);
    });

    for (const item of this.propertiesToSyncWithLocalStorage) {
      this.$watch(
        item.key,
        function() {
          saveToLocalStorage(this, item);
        },
        { deep: true }
      );
    }
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
        timeout: DEFAULT_SNACKBAR_TIMEOUT
      }
    };
  },
  mounted() {
    readFromLocalStorage(this);
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
    showSnackbar(text, timeout) {
      // timeout: {value?: number, factor?: number}
      this.snackbar.text = text;
      this.snackbar.timeout = timeout
        ? timeout.value || (timeout.factor || 1) * DEFAULT_SNACKBAR_TIMEOUT
        : DEFAULT_SNACKBAR_TIMEOUT;
      this.snackbar.snackbar = true;
    },
    showCustomDialog (options) {
      this.$refs.customDialog.show(options);
    },
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
