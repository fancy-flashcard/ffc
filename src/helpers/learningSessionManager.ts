import { Deck, LearningSession, LearningSessionElement } from "@/types";
import Vue from "vue";

export default class LearningSessionManager {
  decks = [] as Deck[];
  numberOfRecentCardsToIgnoreWhenSelectingNextCard = -1;
  cardsToSelectFrom = [] as LearningSessionElement[];
  learningSession = {} as LearningSession;

  constructor(
    decks: Deck[],
    numberOfRecentCardsToIgnoreWhenSelectingNextCard = -1
  ) {
    this.decks = decks;
    this.numberOfRecentCardsToIgnoreWhenSelectingNextCard = numberOfRecentCardsToIgnoreWhenSelectingNextCard;
    this.cardsToSelectFrom = [];

    this.decks.forEach((deck) => {
      if (deck.selected) {
        deck.cards.forEach((card) => {
          this.cardsToSelectFrom.push({ deckId: deck.id, cardId: card.id });
        });
      }
    });
    this.learningSession = { elements: [], currentElementIndex: 0 };
    this.injectNewCard();
  }

  injectNewCard(): boolean {
    if (this.cardsToSelectFrom.length === 0) {
      return false;
    }
    const randomCardIndex = this.getRandomCardIndex();
    this.learningSession.elements.push(this.cardsToSelectFrom[randomCardIndex]);
    this.cardsToSelectFrom.splice(randomCardIndex, 1);
    if (this.numberOfRecentCardsToIgnoreWhenSelectingNextCard >= 0) {
      const indexOfCardToBeUsedAgainForSelection =
        this.learningSession.elements.length -
        (this.numberOfRecentCardsToIgnoreWhenSelectingNextCard + 1);
      if (indexOfCardToBeUsedAgainForSelection >= 0) {
        const cardToBeUsedAgainForSelection = this.learningSession.elements[
          indexOfCardToBeUsedAgainForSelection
        ];
        this.cardsToSelectFrom.push({
          deckId: cardToBeUsedAgainForSelection.deckId,
          cardId: cardToBeUsedAgainForSelection.cardId,
        });
      }
    }
    return true;
  }

  getRandomCardIndex(): number {
    return Math.floor(Math.random() * this.cardsToSelectFrom.length);
  }

  getCurrentLearningSessionElement(): LearningSessionElement {
    const currentLearningSessionElement = this.learningSession.elements[
      this.learningSession.currentElementIndex
    ];
    currentLearningSessionElement.card = this.decks
      .find((deck) => deck.id === currentLearningSessionElement.deckId)
      ?.cards.find((card) => card.id === currentLearningSessionElement.cardId);
    return currentLearningSessionElement;
  }

  moveToNextLearningSessionElement(): void {
    if (
      this.learningSession.currentElementIndex ===
      this.learningSession.elements.length - 1
    ) {
      if (!this.injectNewCard()) {
        return;
      }
    }
    this.learningSession.currentElementIndex++;
  }

  moveToPrevLearningSessionElement(): void {
    if (this.learningSession.currentElementIndex > 0) {
      this.learningSession.currentElementIndex--;
    }
  }

  revealAnswerForCurrentLearningSessionElement(): void {
    const currentLearningSessionElement = this.learningSession.elements[
      this.learningSession.currentElementIndex
    ];
    Vue.set(currentLearningSessionElement, "showAnswer", true);
  }
}
