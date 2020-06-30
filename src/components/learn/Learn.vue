<template>
  <div class="learn" v-if="numberOfSelectedDecks>0">
    <!-- v-if="numberOfSelectedDecks>0"; otherwise it will be shortly displayed before it is catched by beforeMount -->
    <div class="max-height">{{ curLearningElement.card.q }}</div>
    <div class="max-height">
      <span v-if="curLearningElement.showAnswer">{{ curLearningElement.card.a }}</span>
      <v-btn v-else @click="revealAnswer">Reveal Answer</v-btn>
    </div>

    <Rating
      ref="rating"
      v-if="curLearningElement.showAnswer"
      :numberOfStars="numberOfStarsInRating"
      @rated="onRating"
    />
    <v-card-actions>
      <v-btn
        text
        :disabled="learningSessionManager.learningSession.currentElementIndex === 0"
        color="grey lighten-1"
        @click="moveToPrev"
      >Previous</v-btn>
      <v-spacer></v-spacer>
      <v-btn text :color="buttonNext.color" @click="moveToNext">{{buttonNext.text}}</v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Rating from "./Rating.vue";
import { Deck, LearningSessionElement, CardRating, Event } from "../../types";
import LearningSessionManager from "../../helpers/learningSessionManager";

import { finishLearningDialog } from "../../helpers/finishLearningDialogHelper";

const LearnProps = Vue.extend({
  props: {
    decks: { type: Array as () => Deck[] },
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
  learningSessionManager = new LearningSessionManager([]);
  curLearningElement = {
    deckId: 0,
    cardId: 0,
    showAnswer: false,
    rating: 0,
    card: {
      id: 0,
      q: "",
      a: ""
    }
  } as LearningSessionElement;

  created () {
    this.$eventHub.$on(Event.SWIPE_LEFT_IN_LEARN, () => {
      this.moveToNext();
    });
    this.$eventHub.$on(Event.SWIPE_RIGHT_IN_LEARN, () => {
      this.moveToPrev();
    });
  }

  updateCurLearningElement() {
    this.curLearningElement = this.learningSessionManager.getCurrentLearningSessionElement();
  }

  beforeMount() {
    if (this.numberOfSelectedDecks === 0) {
      this.$router.replace("/");
      return;
    }
    this.learningSessionManager = new LearningSessionManager(
      this.decks.filter(deck => deck.selected)
    );
    this.updateCurLearningElement();
  }

  checkIfCardIsEndOfSession(): boolean {
    return (
      this.learningSessionManager.learningSession.currentElementIndex ===
        this.learningSessionManager.learningSession.elements.length - 1 &&
      this.learningSessionManager.cardsToSelectFrom.length === 0
    );
  }

  moveToNext() {
    if (this.checkIfCardIsEndOfSession()) {
      finishLearningDialog(this);
    }
    this.learningSessionManager.moveToNextLearningSessionElement();
    this.updateCurLearningElement();
  }

  get buttonNext(): { text: string; color: string } {
    if (this.checkIfCardIsEndOfSession()) {
      return {
        text: "Finish",
        color: "indigo lighten-1"
      };
    } else {
      return {
        text: "Next",
        color: "grey lighten-1"
      };
    }
  }

  moveToPrev() {
    this.learningSessionManager.moveToPrevLearningSessionElement();
    this.updateCurLearningElement();
  }

  revealAnswer() {
    this.learningSessionManager.revealAnswerForCurrentLearningSessionElement();
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
