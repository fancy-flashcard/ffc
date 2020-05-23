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
          <v-list-item-content>
            <v-list-item-title>Startseite</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item :to="'/about'" link>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    title: String
  },
  data: () => ({
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: true,
      floating: false,
      mini: false
    }
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
