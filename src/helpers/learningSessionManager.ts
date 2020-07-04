import { Deck, LearningSession, LearningSessionElement } from "@/types";

/* numberOfRecentCardsToIgnoreWhenSelectingNextCard defines when a card can be used again;
 * it's an object where the key defines the rating for which this rule applies and the value
 * says how many other cards need to be used before the card can be used again
 */

export default class LearningSessionManager {
  decks = [] as Deck[];
  numberOfRecentCardsToIgnoreWhenSelectingNextCard: {
    [rating: number]: number;
  } = {};
  cardsToSelectFrom = [] as LearningSessionElement[];
  learningSession = {} as LearningSession;

  constructor(
    selectedDecks: Deck[],
    numberOfRecentCardsToIgnoreWhenSelectingNextCard: {
      [rating: number]: number;
    } = {}
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

    for (const ruleRating in this
      .numberOfRecentCardsToIgnoreWhenSelectingNextCard) {
      const indexOfCardToBePossiblyUsedAgainForSelection =
        this.learningSession.elements.length -
        (this.numberOfRecentCardsToIgnoreWhenSelectingNextCard[
          Number(ruleRating)
        ] +
          1);
      if (indexOfCardToBePossiblyUsedAgainForSelection >= 0) {
        const cardToBeUsedAgainForSelection = this.learningSession.elements[
          indexOfCardToBePossiblyUsedAgainForSelection
        ];
        if (cardToBeUsedAgainForSelection.rating?.r === Number(ruleRating)) {
          this.cardsToSelectFrom.push({
            deckId: cardToBeUsedAgainForSelection.deckId,
            cardId: cardToBeUsedAgainForSelection.cardId,
          });
        }
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
