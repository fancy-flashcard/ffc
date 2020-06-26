<template>
  <div class="learn" v-if="numberOfSelectedDecks>0">
    <!-- v-if="numberOfSelectedDecks>0"; otherwise it will be shortly displayed before it is catched by beforeMount -->
    <div class="max-height">{{ card.q }}</div>
    <div class="max-height">
      <span v-if="curLearningElement.showAnswer">{{ card.a }}</span>
      <v-btn v-else @click="curLearningElement.showAnswer = true">Reveal Answer</v-btn>
    </div>

    <Rating
      ref="rating"
      v-if="curLearningElement.showAnswer"
      :numberOfStars="numberOfStarsInRating"
      @rated="onRating"
    />
    <v-card-actions>
      <v-btn text color="grey lighten-1">Prev</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="grey lighten-1">Next</v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Rating from "./Rating.vue";
import {
  Deck,
  Card,
  LearningSession,
  LearningSessionElement,
  CardRating,
  QuitLearningReason
} from "../../types";
import { injectNewLearningElement } from "../../helpers/cardSelectionHelper";
import { quitLearning } from "../../helpers/quitLearningDialogHelper";

const LearnProps = Vue.extend({
  props: {
    decks: { type: Array as () => Deck[] },
    learningSession: { type: Object as () => LearningSession },
    numberOfSelectedDecks: Number
  }
});

@Component({
  components: {
    Rating
  }
})
export default class Learn extends LearnProps {
  numberOfStarsInRating = 5;

  beforeMount() {
    if (this.numberOfSelectedDecks === 0) {
      this.$router.replace("/");
    }
  }

  get curLearningElement(): LearningSessionElement {
    let curElement = this.learningSession.elements[
      this.learningSession.currentElementIndex
    ];
    if (!curElement) {
      if (injectNewLearningElement(this.decks, this.learningSession)) {
        curElement = this.learningSession.elements[
          this.learningSession.currentElementIndex
        ];
      } else {
        this.$eventHub.$emit("quitLearning", QuitLearningReason.NO_MORE_CARDS);
        return { deckId: -1, cardId: -1, showAnswer: false, rating: -1 };
      }
    }
    return curElement;
  }

  get card(): Card {
    const deck = this.decks.find(
      deck => deck.id === this.curLearningElement.deckId
    );
    const card = deck?.cards.find(
      card => card.id === this.curLearningElement.cardId
    );
    if (!card) {
      return { id: -1, q: "", a: "" };
    }
    return card;
  }

  onRating(cardRating: CardRating, programmatically = false) {
    // TODO: store rating
    if (programmatically === false) {
      // TODO: jump to next card
    }
  }
  updateVerticalCentering() {
    for (const el of document.getElementsByClassName("max-height")) {
      if (el.scrollHeight > el.clientHeight) {
        el.classList.remove("flex-center");
      } else {
        el.classList.add("flex-center");
      }
    }
  }
  mounted() {
    this.updateVerticalCentering();
  }
  updated() {
    this.updateVerticalCentering();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.learn {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.max-height {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;
  align-items: center;
  padding: 0 16px;
}

.flex-center {
  justify-content: center;
}
</style>
