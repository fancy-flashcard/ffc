<template>
  <v-dialog v-model="showInfo" max-width="400">
    <v-card color="#2e2e2e">
      <v-card-title class="headline">{{deck ? deck.name : ""}}</v-card-title>

      <v-list v-if="deck">
        <v-list-item v-for="item in fileInfos" :key="item.key">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-content>{{ deck.meta.file[item.key] || "-" }}</v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in deckInfos" :key="item.key">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-content>{{ deck.meta.deck[item.key] || "-" }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>Number of Cards</v-list-item-content>
          <v-list-item-content>{{ deck.cards.length }}</v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="showInfo = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogDeckInfo",
  props: {
    deck: Object
  },
  data() {
    return {
      showInfo: false,
      fileInfos: [{ key: "author", name: "Author" }],
      deckInfos: [{ key: "description", name: "Description" }]
    };
  },
  methods: {
    hide() {
      this.showInfo = false;
    },
    show() {
      this.showInfo = true;
    }
  }
};
</script>

<style scoped>
.v-list,
.v-sheet {
  background-color: unset;
}
</style>