<template>
  <v-col cols="12" sm="12" md="6" lg="4" xl="4">
    <v-card height="100%" raised>
      <v-card-title>Third Party Decks</v-card-title>
      <v-card-text>
        Import decks created by others here.
        You can add decks here as well, just checkout our GitHub repository.
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
