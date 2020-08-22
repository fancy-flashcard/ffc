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
        <v-list-item>
          <v-img src="../../assets/flash.svg" class="ffc-icon"></v-img>
        </v-list-item>
        <v-divider></v-divider>
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

    <v-app-bar :clipped-left="primaryDrawer.clipped" app :class="colorAppBar">
      <v-btn icon v-if="isInDeckSelection && numberOfSelectedDecks>0" @click="deselectAll">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn icon v-else-if="isInLearning" @click="quitLearning">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon v-else @click.stop="togglePrimaryDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        v-if="isInDeckSelection && numberOfSelectedDecks===1"
        @click="showInfoForSelectedDeck"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn
        icon
        v-if="isInDeckSelection && numberOfSelectedDecks>0"
        @click="selectAll"
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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Deck, Event, NavBarConfigItem } from '../../types';
import navBarConfigJson from './navbar.json';

import * as selectedDeckDialogHelper from "../../helpers/selectedDeckDialogHelper";

const NavigationBarProps = Vue.extend({
  props: {
    title: String,
    decks: {type: Array as () => Deck[]},
    numberOfSelectedDecks: Number,
  }
});

@Component
export default class NavigationBar extends NavigationBarProps {
  primaryDrawer = {
    model: false,
    type: "temporary",
    clipped: true,
    floating: false,
    mini: false
  };
  navBarList = navBarConfigJson as NavBarConfigItem[];

  get isInDeckSelection() {
    return this.$route.name === "DeckSelection";
  }
  get isInLearning() {
    return this.$route.name === "Learn";
  }
  get colorAppBar() {
    if (this.isInDeckSelection && this.numberOfSelectedDecks > 0) {
      return "indigo";
    }
    return "";
  }
  get toolbarTitle() {
    if (this.isInDeckSelection && this.numberOfSelectedDecks > 0) {
      return `${this.numberOfSelectedDecks} deck${
        this.numberOfSelectedDecks === 1 ? "" : "s"
      } selected`;
    }
    return this.title;
  }

  deselectAll() {
    this.$eventHub.$emit(Event.DESELECT_ALL_DECKS);
  }
  selectAll() {
    this.$eventHub.$emit(Event.SELECT_ALL_DECKS);
  }
  deleteSelected() {
    selectedDeckDialogHelper.deleteSelected(this);
  }
  showInfoForSelectedDeck() {
    selectedDeckDialogHelper.showInfoForSelectedDeck(this);
  }
  showDrawer() {
    this.primaryDrawer.model = true;
  }
  hideDrawer() {
    this.primaryDrawer.model = false;
  }
  quitLearning() {
    this.$eventHub.$emit(Event.PREPARE_QUIT_LEARNING);
  }
  togglePrimaryDrawer() {
    this.primaryDrawer.model = !this.primaryDrawer.model;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ffc-icon {
  height: 200px;
}
.v-list {
  padding: 0;
}
</style>
