<template>
  <div id="app">
    <v-window :touch="{ left: swipeLeft, right: swipeRight }">
      <v-app id="inspire">
        <v-app id="sandbox">
          <v-main>
            <NavigationBar
              ref="navbar"
              title="Fancy Flashcard"
              :decks="decks"
              :numberOfSelectedDecks="numberOfSelectedDecks"
            ></NavigationBar>
            <router-view
              :decks="decks"
              :numberOfSelectedDecks="numberOfSelectedDecks"
              :cardLimit="cardLimit"
            />
            <v-snackbar app v-model="snackbar.snackbar" :timeout="snackbar.timeout">
              {{ snackbar.text }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="orange darken-1"
                  text
                  v-bind="attrs"
                  @click="snackbar.snackbar = false"
                >Close</v-btn>
              </template>
            </v-snackbar>
            <CustomDialog ref="customDialog" />
          </v-main>
        </v-app>
      </v-app>
    </v-window>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Deck, CustomDialogOptions, Event } from "./types";

import NavigationBar from "./components/layout/NavigationBar.vue";
import CustomDialog from "./components/customdialog/CustomDialog.vue";
import { registerEventListenerForMainApp } from "./helpers/eventListener";
import {
  readFromLocalStorage,
  saveToLocalStorage,
  SyncItem
} from "./helpers/localStorageHelper";
import continueCurrentLearningSessionIfPresent from "./helpers/continueLearningHelper";

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
  propertiesToSyncWithLocalStorage = [
    { key: "decks", defaultValue: [] },
    { key: "cardLimit", defaultValue: "" }
  ] as SyncItem[];
  cardLimit = "";
  decks = [] as Deck[];
  snackbar = {
    text: "",
    snackbar: false
  };

  $refs!: {
    navbar: NavigationBar;
    customDialog: CustomDialog;
  };

  setSelectedStatusForAllDecks(status: boolean) {
    this.decks.forEach(deck => {
      deck.selected = status;
    });
  }

  created() {
    registerEventListenerForMainApp(this);

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
    this.setSelectedStatusForAllDecks(false);
    continueCurrentLearningSessionIfPresent(
      this.$eventHub,
      this.$router,
      this.decks
    );
  }

  get numberOfSelectedDecks() {
    return this.decks.filter(deck => deck.selected).length;
  }

  swipeLeft() {
    if (this.$route.name === "Learn") {
      this.$eventHub.$emit(Event.SWIPE_LEFT_IN_LEARN);
      return;
    }
    this.$refs.navbar.hideDrawer();
  }
  swipeRight() {
    if (this.$route.name === "Learn") {
      this.$eventHub.$emit(Event.SWIPE_RIGHT_IN_LEARN);
      return;
    }
    this.$refs.navbar.showDrawer();
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