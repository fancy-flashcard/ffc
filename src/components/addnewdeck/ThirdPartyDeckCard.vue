<template>
  <v-col cols="12" sm="12" md="6" lg="4" xl="4">
    <v-card height="100%" raised>
      <v-card-title>Third Party Decks</v-card-title>
      <v-card-text>
        Easily import decks created by others.
        If you want to add your own deck to the selection, check out our <a href="https://github.com/fancy-flashcard/ffc/">GitHub repository</a>!
      </v-card-text>
      <div class="horizontal-spacer"></div>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="indigo" right @click="$router.push('thirdparty')">View Third Party Decks</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ThirdPartyDecks extends Vue {}
</script>

<style scoped>
#file-input-wrapper {
  padding-bottom: 0;
}
.button-padding {
  padding: 16px;
}
.v-card {
  display: flex;
  flex-direction: column;
}
.horizontal-spacer {
  flex-grow: 1;
}
</style>
