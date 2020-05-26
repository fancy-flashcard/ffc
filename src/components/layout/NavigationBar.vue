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
        <v-list-item :to="'/'" link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item :to="'/about'" link>
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon v-if="numberOfSelectedDecks===0"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-btn v-else icon
        @click="deselectAll"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>


      <v-toolbar-title>
        {{ numberOfSelectedDecks > 0
          ? `${numberOfSelectedDecks} deck${numberOfSelectedDecks === 1 ? "":"s"} selected`
          : title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="numberOfSelectedDecks===1"
        @click="showInfoForSelectedDeck"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn icon v-if="numberOfSelectedDecks>0"
        @click="selectAll"
      >
        <v-icon>mdi-checkbox-multiple-marked</v-icon>
      </v-btn>

      <v-btn icon v-if="numberOfSelectedDecks>0"
        @click="deselectAll"
      >
        <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
      </v-btn>

      <v-btn icon v-if="numberOfSelectedDecks>0"
        @click="deleteSelected"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  created: function () {
    this.$eventHub.$on("numberOfSelectedDecks", (data) => {
      this.numberOfSelectedDecks = data;
    });
  },
  props: {
    title: String
  },
  data: () => ({
    primaryDrawer: {
      model: null,
      type: "temporary",
      clipped: true,
      floating: false,
      mini: false
    },
    numberOfSelectedDecks: 0,
  }),
  methods: {
    deselectAll () {
      this.$eventHub.$emit("clearDeckSelection");
    },
    selectAll () {
      this.$eventHub.$emit("selectAllDecks");
    },
    deleteSelected () {
      this.$eventHub.$emit("deleteSelectedDecks");
    },
    showInfoForSelectedDeck () {
      this.$eventHub.$emit("showInformationForSelectedDeck");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
