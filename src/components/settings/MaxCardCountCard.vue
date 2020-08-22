<template>
  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
    <v-card height="100%" raised>
      <v-card-title>Max Card Count</v-card-title>
      <v-card-text>
        <p>
          Define the number of cards that will be in each learning session.
          <v-icon
            size="1em"
            @click="showHelpText = !showHelpText"
            class="mx-1"
          >mdi-help-circle-outline</v-icon>
        </p>
        <p
          class="description"
          v-show="showHelpText"
        >If the given deck(s) has(have) less cards it will default to the number of cards in the given deck(s). The value "0" stands for every card in the given deck(s).</p>
        <v-text-field v-model="maxCardCount" type="number" min="0" label="Maximum Cards" outlined></v-text-field>
      </v-card-text>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="indigo" @click="updateMaxCardCount" right>Update Maximum Cards</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import {
  getMaxCardCount,
  setMaxCardCount
} from "../../helpers/maxCardCountLocalStorageHelper";

@Component
export default class MaxCardCount extends Vue {
  showHelpText = false;
  maxCardCount: number | null = getMaxCardCount();

  updateMaxCardCount() {
    setMaxCardCount(this, this.maxCardCount);
  }
}
</script>

<style scoped>
.button-padding {
  padding: 16px;
}
</style>
