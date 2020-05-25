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
            <v-list-item-title>Startseite</v-list-item-title>
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
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-checkbox-multiple-marked</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <!-- https://vuetifyjs.com/en/components/toolbars/#contextual-action-bars -->

      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click=""
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
      type: "temporary",
      clipped: true,
      floating: false,
      mini: false
    },
    items: [
      { title: 'Select All' },
      { title: 'Deselect All' },
      { title: 'Delete' },
    ]
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
