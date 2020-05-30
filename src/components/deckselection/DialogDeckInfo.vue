<template>
    <v-dialog
      v-model="showInfo"
    >
      <v-card>
        <v-card-title class="headline">{{deck ? deck.deckname : ""}}</v-card-title>

        <v-card-text class="text-left">foo bar ...</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
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