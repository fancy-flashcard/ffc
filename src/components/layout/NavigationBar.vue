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
      :class="{ 'indigo': numberOfSelectedDecks>0}"
    >
      <v-app-bar-nav-icon
        v-if="numberOfSelectedDecks===0"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-btn v-else icon @click="deselectAll">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-toolbar-title>
        {{ numberOfSelectedDecks > 0
        ? `${numberOfSelectedDecks} deck${numberOfSelectedDecks === 1 ? "":"s"} selected`
        : title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="numberOfSelectedDecks===1" @click="showInfoForSelectedDeck">
        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn icon v-if="numberOfSelectedDecks>0" @click="selectAll">
        <v-icon>mdi-checkbox-multiple-marked</v-icon>
      </v-btn>

      <v-btn icon v-if="numberOfSelectedDecks>0" @click="deleteSelected">
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
      console.log("delete");
    },
    showInfoForSelectedDeck() {
      console.log("show info");
    },
    showDrawer() {
      this.primaryDrawer.model = true;
    },
    hideDrawer() {
      this.primaryDrawer.model = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
