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
import {
  Deck,
  LearningSessionElement,
  Event,
  CustomDialogOptionsBarChartBar
} from "../../types";
import LearningSessionManager from "../../helpers/learningSessionManager";
import FollowUpLearningSessionManager from "../../helpers/followUpLearningSessionManager";

import { finishLearningDialog } from "../../helpers/finishLearningDialogHelper";
import { quitLearningDialog } from "../../helpers/quitLearningDialogHelper";
import {
  saveLearningSessionManagerDataToLocalStorage,
  getLearningSessionManagerDataFromLocalStorage
} from "../../helpers/learningSessionStorageHelper";

const LearnProps = Vue.extend({
  props: {
    decks: { type: Array as () => Deck[] },
    numberOfSelectedDecks: Number,
    cardLimit: String
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
  isLearningSessionFinishedAndComponentWillBeDestroyedSoon = false;
  curLearningElement = {
    deckId: 0,
    cardId: 0,
    showAnswer: false,
    rating: {},
    card: {
      id: 0,
      q: "",
      a: ""
    }
  } as LearningSessionElement;

  $refs!: {
    rating: Rating;
  };

  created() {
    this.isLearningSessionFinishedAndComponentWillBeDestroyedSoon = false;
    this.$eventHub.$on(Event.SWIPE_LEFT_IN_LEARN, () => {
      this.moveToNext();
    });
    this.$eventHub.$on(Event.SWIPE_RIGHT_IN_LEARN, () => {
      this.moveToPrev();
    });
    this.$eventHub.$on(Event.PREPARE_QUIT_LEARNING, () => {
      this.quitLearning();
    });
  }
  destroyed() {
    this.$eventHub.$off(Event.SWIPE_LEFT_IN_LEARN);
    this.$eventHub.$off(Event.SWIPE_RIGHT_IN_LEARN);
    this.$eventHub.$off(Event.PREPARE_QUIT_LEARNING);
  }

  updateCurLearningElement() {
    if (this.isLearningSessionFinishedAndComponentWillBeDestroyedSoon) return;
    this.curLearningElement = this.learningSessionManager.getCurrentLearningSessionElementWithCardDetails();
    this.updateRatingForCurrentLearningElement();
    saveLearningSessionManagerDataToLocalStorage(this.learningSessionManager);
  }

  updateRatingForCurrentLearningElement() {
    let r = 0;
    if (this.curLearningElement.rating?.r !== undefined) {
      r = this.mapRatingFrom100ToStars(this.curLearningElement.rating.r);
    }
    // rating component is not mounted yet due to re-rendering
    this.$nextTick(() => {
      if (this.$refs.rating) {
        this.$refs.rating.setRating(r);
      }
    });
  }

  beforeMount() {
    const learningSessionManagerDataInLocalStorage = getLearningSessionManagerDataFromLocalStorage();
    if (learningSessionManagerDataInLocalStorage) {
      this.learningSessionManager = new FollowUpLearningSessionManager(
        learningSessionManagerDataInLocalStorage
      );
    } else {
      if (this.numberOfSelectedDecks === 0) {
        this.$router.replace("/");
        return;
      }
      this.learningSessionManager = new LearningSessionManager(
        this.decks.filter(deck => deck.selected)
      );
    }
    this.updateCurLearningElement();
  }

  checkIfCardIsEndOfSession(): boolean {
    const endOfSession =
      (this.learningSessionManager.learningSession.currentElementIndex ===
        this.learningSessionManager.learningSession.elements.length - 1 &&
        this.learningSessionManager.cardsToSelectFrom.length === 0) ||
      (this.cardLimit === "0"
        ? false
        : this.learningSessionManager.learningSession.currentElementIndex ===
          parseInt(this.cardLimit) - 1);
    return endOfSession;
  }

  moveToNext() {
    if (this.checkIfCardIsEndOfSession()) {
      this.finishSession();
    }
    this.learningSessionManager.moveToNextLearningSessionElement();
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
  }

  revealAnswer() {
    this.learningSessionManager.revealAnswerForCurrentLearningSessionElement();
  }

  onRating(rating: number, programmatically = false) {
    if (programmatically) return;
    const r = this.mapRatingFromStarsTo100(rating);
    this.learningSessionManager.saveRatingForCurrentLearningSessionElement(r);
    saveLearningSessionManagerDataToLocalStorage(this.learningSessionManager);
  }

  mapRatingFromStarsTo100(rating: number): number {
    // map 1-n -> 0-100
    return ((rating - 1) * 100) / (this.numberOfStarsInRating - 1);
  }
  mapRatingFrom100ToStars(rating: number): number {
    // map 0-100 -> 1-n
    return (rating * (this.numberOfStarsInRating - 1)) / 100 + 1;
  }

  finishSession() {
    finishLearningDialog(this, this.getBarsForFinishLearningDialog(), () => {
      this.isLearningSessionFinishedAndComponentWillBeDestroyedSoon = true;
    });
  }

  getBarsForFinishLearningDialog(): CustomDialogOptionsBarChartBar[] {
    const bars = [];
    for (let rating = 1; rating <= this.numberOfStarsInRating; rating++) {
      bars.push({ name: `${rating}`, value: 0 });
    }
    for (const element of this.learningSessionManager.learningSession
      .elements) {
      if (element.rating?.r !== undefined) {
        bars[this.mapRatingFrom100ToStars(element.rating.r) - 1].value += 1;
      }
    }
    return bars;
  }

  quitLearning() {
    quitLearningDialog(this, this.getBarsForFinishLearningDialog());
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
    this.updateCurLearningElement();
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
