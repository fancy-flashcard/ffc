import Vue from "vue";
import { Deck } from "@/types";
import VueRouter from "vue-router";
import {
  getLearningSessionManagerDataFromLocalStorage,
  clearLearningSessionManagerDataInLocalStorage,
} from "./learningSessionStorageHelper";

export default function continueCurrentLearningSessionIfPresent(
  eventHub: Vue,
  router: VueRouter,
  decks: Deck[]
) {
  const data = getLearningSessionManagerDataFromLocalStorage();
  if (data) {
    const options = {
      title: `Continue Learning?`,
      message:
        `You didn't finish your last learning session. Do you want to resume learning where you stopped last session?
        Your last session included the following decks: ` +
        data.decks.reduce(
          (str: string, deck: Deck, index: number) =>
            str + (index > 0 ? ", " : "") + deck.name,
          ""
        ),
      buttons: [
        {
          name: "Discard Session",
          color: "grey",
          callback: () => {
            clearLearningSessionManagerDataInLocalStorage();
            if (router.currentRoute.name !== "DeckSelection") {
              router.replace("/");
            }
          },
        },
        {
          name: "Resume",
          color: "indigo",
          callback: () => {
            data.decks.forEach((deckFromLastSession: Deck) => {
              const curDeck = decks.find(
                (deckInUse) => deckInUse.id === deckFromLastSession.id
              );
              if (curDeck) {
                curDeck.selected = true;
              }
            });
            if (router.currentRoute.name !== "Learn") {
              router.replace("learn");
            }
          },
        },
      ],
    };
    eventHub.$emit("showCustomDialog", options);
  }
}
