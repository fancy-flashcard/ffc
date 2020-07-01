import { Deck, LearningSession, LearningSessionElement } from "@/types";

export default class LearningSessionManager {
  decks = [] as Deck[];
  numberOfRecentCardsToIgnoreWhenSelectingNextCard = -1;
  cardsToSelectFrom = [] as LearningSessionElement[];
  learningSession = {} as LearningSession;

  constructor(
    selectedDecks: Deck[],
    numberOfRecentCardsToIgnoreWhenSelectingNextCard = -1
  ) {
    this.decks = selectedDecks;
    this.numberOfRecentCardsToIgnoreWhenSelectingNextCard = numberOfRecentCardsToIgnoreWhenSelectingNextCard;
    this.cardsToSelectFrom = [];

    this.decks.forEach((deck) => {
      deck.cards.forEach((card) => {
        this.cardsToSelectFrom.push({
          deckId: deck.id,
          cardId: card.id,
          showAnswer: false,
          rating: undefined,
          card: undefined,
        });
      });
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

  getCurrentLearningSessionElementWithCardDetails(): LearningSessionElement {
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
    currentLearningSessionElement.showAnswer = true;
  }

  saveRatingForCurrentLearningSessionElement(rating: number): boolean {
    const currentLearningSessionElement = this.learningSession.elements[
      this.learningSession.currentElementIndex
    ];
    const t = new Date().getTime();
    let didOverwriteOldRating = false;
    const deck = this.decks.find(
      (deck) => deck.id === currentLearningSessionElement.deckId
    );
    const card = deck?.cards.find(
      (card) => card.id === currentLearningSessionElement.cardId
    );
    if (currentLearningSessionElement.rating?.t) {
      const oldRating = card?.r?.find(
        (oldRatingObject) =>
          oldRatingObject.t === currentLearningSessionElement.rating?.t
      );
      if (oldRating) {
        oldRating.t = t;
        oldRating.r = rating;
        didOverwriteOldRating = true;
      }
    } else {
      if (card) {
        if (!Array.isArray(card?.r)) {
          card.r = [];
        }
        card.r.push({ t, r: rating });
      }
    }
    currentLearningSessionElement.rating = { t, r: rating };
    return Boolean(didOverwriteOldRating);
  }
}
