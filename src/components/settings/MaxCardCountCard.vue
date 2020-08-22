<template>
  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
    <v-card height="100%" raised>
      <v-card-title>Max Card Count</v-card-title>
      <v-card-text>
        <p>
          Limit the number of cards that will be in each learning session.
          <v-icon
            size="1em"
            @click="showHelpText = !showHelpText"
            class="mx-1"
          >mdi-help-circle-outline</v-icon>
        </p>
        <p
          class="description"
          v-show="showHelpText"
        >If the given deck(s) has(have) less cards it will default to the number of cards in the given deck(s).</p>
        <v-text-field v-model="curMaxCardCount" type="number" min="1" :label="label" outlined></v-text-field>
      </v-card-text>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="red" @click="deactivateMaxCardCount" right>Deactivate Limit</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Event } from '../../types';

const MaxCardCountProps = Vue.extend({
  props: {
    maxCardCount: String
  }
});

@Component
export default class MaxCardCount extends MaxCardCountProps {
  noLimitString = "Currently no limit";
  defaultLabel = "Maximum Cards";
  showHelpText = false;

  get label() {
    return this.maxCardCount === "0" || null
      ? this.noLimitString
      : this.defaultLabel;
  }

  get curMaxCardCount() {
    return this.maxCardCount === "0" || null ? null : this.maxCardCount;
  }

  set curMaxCardCount(newValue) {
    this.$eventHub.$emit(Event.UPDATE_MAX_CARD_COUNT, newValue);
  }

  deactivateMaxCardCount() {
    this.$eventHub.$emit(Event.UPDATE_MAX_CARD_COUNT, "0");
  }
}
</script>

<style scoped>
.button-padding {
  padding: 16px;
}
</style>
