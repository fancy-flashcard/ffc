<template>
  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
    <v-card height="100%" raised>
      <v-card-title>Card Limit</v-card-title>
      <v-card-text>
        <p class="paragraph">
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
        >If the given deck(s) has (have) less cards it will default to the number of cards in the given deck(s).</p>
        <v-text-field
          v-model="curCardLimit"
          type="number"
          min="1"
          :label="label"
          hide-details="auto"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="button-padding">
        <v-spacer></v-spacer>
        <v-btn color="red" @click="deactivatecardLimit" right>Deactivate Limit</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Event } from "../../types";

const CardLimitProps = Vue.extend({
  props: {
    cardLimit: String
  }
});

@Component
export default class CardLimit extends CardLimitProps {
  noLimitString = "Currently no limit";
  defaultLabel = "Card Limit";
  showHelpText = false;

  get label() {
    return this.curCardLimit ? this.defaultLabel : this.noLimitString;
  }

  get curCardLimit() {
    return this.cardLimit === "0" || !this.cardLimit ? null : this.cardLimit;
  }

  set curCardLimit(newValue) {
    this.$eventHub.$emit(Event.UPDATE_CARD_LIMIT, newValue);
  }

  deactivatecardLimit() {
    this.$eventHub.$emit(Event.UPDATE_CARD_LIMIT, "0");
  }
}
</script>

<style scoped>
.button-padding {
  padding: 16px;
}
.description {
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
}
p .v-icon {
  color: inherit;
}

.paragraph {
  display: flex;
}

/* Disable stepper in number input */
::v-deep input,
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
}
</style>
