<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="sandbox">
        <v-content>
          <NavigationBar title="Fancy Flashcard"></NavigationBar>
          <router-view />
          <Footer></Footer>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
