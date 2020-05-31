<template>
    <v-dialog
      v-model="showInfo"
      max-width="400"
    >
      <v-card color="#2e2e2e">
        <v-card-title class="headline">{{deck ? deck.deckname : ""}}</v-card-title>

        <v-card-text class="text-left">foo bar ...</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="showInfo = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DialogDeckInfo",
    props: {
        deck: Object,
    },
    data() {
      return {
        showInfo: false,
      };
    },
    methods: {
        hide() {
            this.showInfo = false;
        },
        show() {
            this.showInfo = true;
        },
    },
};
</script>

<style scoped>
</style>