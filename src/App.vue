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
                <v-btn color="orange darken-1" text @click="snackbar.snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
            <CustomDialog ref="customDialog" />
          </v-content>
        </v-app>
      </v-app>
    </v-window>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Deck, CustomDialogOptions, FFCFile } from "./types";

import NavigationBar from "./components/layout/NavigationBar.vue";
import CustomDialog from "./components/customdialog/CustomDialog.vue";
import {
  readFromLocalStorage,
  saveToLocalStorage,
  clearLocalStorage
} from "./helpers/localStorageHelper";
import { addDecksFromFile, addDecksFromJSON } from "./helpers/addDecksHelper";

const DEFAULT_SNACKBAR_TIMEOUT = 2000;

const AppProps = Vue.extend({
  props: {
    title: String
  }
});

@Component({
  components: {
    NavigationBar,
    CustomDialog
  }
})
export default class App extends AppProps {
  propertiesToSyncWithLocalStorage = [{ key: "decks", defaultValue: [] }];
  decks = [] as Deck[];
  navBarList = [
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
  ];
  snackbar = {
    text: "",
    snackbar: false,
    timeout: DEFAULT_SNACKBAR_TIMEOUT
  };

  $refs!: {
    navbar: NavigationBar;
    customDialog: CustomDialog;
  };

  created() {
    this.$eventHub.$on("deleteSelectedDecks", () => {
      this.decks = this.decks.filter(deck => !deck.selected);
    });
    this.$eventHub.$on("addDecksFromFile", (fileContent: string) => {
      addDecksFromFile(this, fileContent);
    });
    this.$eventHub.$on("addDecksFromJSON", (fileContent: FFCFile) => {
      addDecksFromJSON(this, fileContent);
    });
    this.$eventHub.$on("snackbarEvent", (message: string) => {
      this.showSnackbar(message);
    });
    this.$eventHub.$on("clearLocalStorage", () => {
      clearLocalStorage(this);
    });
    this.$eventHub.$on("showCustomDialog", (options: CustomDialogOptions) => {
      this.showCustomDialog(options);
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
  }

  mounted() {
    readFromLocalStorage(this);
    this.decks.forEach(deck => {
      deck.selected = false;
    });
  }

  get numberOfSelectedDecks() {
    return this.decks.filter(deck => deck.selected).length;
  }

  swipeLeft() {
    if (this.$route.name === "Learn") {
      return;
    }
    this.$refs.navbar.hideDrawer();
  }
  swipeRight() {
    if (this.$route.name === "Learn") {
      return;
    }
    this.$refs.navbar.showDrawer();
  }
  showSnackbar(text: string, timeout?: { value?: number; factor?: number }) {
    // timeout: {value?: number, factor?: number}
    this.snackbar.text = text;
    this.snackbar.timeout = timeout
      ? timeout.value || (timeout.factor || 1) * DEFAULT_SNACKBAR_TIMEOUT
      : DEFAULT_SNACKBAR_TIMEOUT;
    this.snackbar.snackbar = true;
  }
  showCustomDialog(options: CustomDialogOptions) {
    this.$refs.customDialog.show(options);
  }
}
</script>

<style>
html,
body {
  /* apply dark mode to scrollbar in firefox desktop */
  background-color: #000;
  /* remove scrollbar on desktop when not needed */
  overflow-y: auto !important;
  overscroll-behavior: none;
}

.v-card__title {
  word-break: normal;
}

/* reduce margin of file/url deck input */
.deck-input .v-input__control .v-input__slot {
  margin-bottom: 0;
}
.deck-input .v-input__control .v-text-field__details {
  display: none;
}

/* fix highlighting problems in vuetify */
.theme--dark.v-list-item:hover::before,
.theme--dark.v-btn:hover::before,
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0;
}
.theme--dark.v-list-item--active:hover::before,
.theme--dark.v-list-item--active::before {
  opacity: 0.24;
}
</style>