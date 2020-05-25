<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="sandbox">
        <v-content>
          <NavigationBar title="Fancy Flashcard"></NavigationBar>
          <router-view />
        </v-content>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import NavigationBar from "./components/layout/NavigationBar.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  props: {
    title: String
  },
  components: {
    NavigationBar,
    Footer
  }
};
</script>

<style>
html, body {
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
