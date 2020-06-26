<template>
  <div class="learn">
    <LearnComponent
      :decks="decks"
      :numberOfSelectedDecks="numberOfSelectedDecks"
      :learningSession="learningSession"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Deck, LearningSession } from "../types";

import LearnComponent from "../components/learn/Learn.vue";

const LearnProps = Vue.extend({
  props: {
    decks: { type: Array as () => Deck[] },
    learningSession: { type: Object as () => LearningSession },
    numberOfSelectedDecks: Number
  }
});

@Component({
  components: {
    LearnComponent
  }
})
export default class Learn extends LearnProps {}
</script>

<style scoped>
.learn {
  height: 100%;
}
</style>