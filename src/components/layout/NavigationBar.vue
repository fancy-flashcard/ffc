<template>
  <div class="NavBar">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <v-list>
        <v-list-item v-for="navItem in navBarList" :key="navItem.to" :to="navItem.to" link>
          <v-list-item-icon>
            <v-icon>{{navItem.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{navItem.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      :class="colorAppBar"
    >
      <v-btn icon
        v-if="isInDeckSelection && numberOfSelectedDecks>0"
        @click="deselectAll"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn icon
        v-else-if="isInLearning"
        @click="quitLearning"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon v-else
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ toolbarTitle }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="isInDeckSelection && numberOfSelectedDecks===1" @click="showInfoForSelectedDeck">
        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn icon v-if="isInDeckSelection && numberOfSelectedDecks>0" @click="selectAll"
        :disabled="numberOfSelectedDecks === decks.length"
      >
        <v-icon>mdi-checkbox-multiple-marked</v-icon>
      </v-btn>

      <v-btn icon v-if="isInDeckSelection && numberOfSelectedDecks>0" @click="deleteSelected">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    title: String,
    decks: Array,
    numberOfSelectedDecks: Number,
    navBarList: Array
  },
  data: () => ({
    primaryDrawer: {
      model: false,
      type: "temporary",
      clipped: true,
      floating: false,
      mini: false
    }
  }),
  computed: {
    isInDeckSelection() {
      return this.$route.name === "DeckSelection";
    },
    isInLearning() {
      return this.$route.name === "Learn";
    },
    colorAppBar() {
      if (this.isInDeckSelection && this.numberOfSelectedDecks > 0) {
        return "indigo";
      }
      return "";
    },
    toolbarTitle() {
      if (this.isInDeckSelection && this.numberOfSelectedDecks > 0) {
        return `${this.numberOfSelectedDecks} deck${this.numberOfSelectedDecks === 1 ? "":"s"} selected`;
      }
      return this.title;
    },
  },
  methods: {
    deselectAll() {
      this.decks.forEach(deck => {
        deck.selected = false;
      });
    },
    selectAll() {
      this.decks.forEach(deck => {
        deck.selected = true;
      });
    },
    deleteSelected() {
      this.$eventHub.$emit("askForConfirmationToDeleteSelectedDecks");
    },
    showInfoForSelectedDeck() {
      this.$eventHub.$emit("showInfoForSelectedDeck");
    },
    showDrawer() {
      this.primaryDrawer.model = true;
    },
    hideDrawer() {
      this.primaryDrawer.model = false;
    },
    quitLearning() {
      this.$eventHub.$emit("askForConfirmationToQuitLearning");
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
