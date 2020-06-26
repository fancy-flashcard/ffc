import { Deck, LearningSession, LearningSessionElement } from "@/types";

interface CardIgnoreMap {
  [x: string]: boolean;
}

export function injectNewLearningElement(
  decks: Deck[],
  learningSession: LearningSession
): boolean {
  const cardIgnoreMap = getCardIgnoreMap(decks, learningSession);

  const cardsToSelectFrom = [] as LearningSessionElement[];
  decks.forEach((deck) => {
    if (deck.selected) {
      deck.cards.forEach((card) => {
        if (!(getKeyForCardIgnoreMap(deck.id, card.id) in cardIgnoreMap)) {
          cardsToSelectFrom.push({ deckId: deck.id, cardId: card.id });
        }
      });
    }
  });

  if (cardsToSelectFrom.length === 0) {
    return false;
  }

  const newLearningElement =
    cardsToSelectFrom[Math.floor(Math.random() * cardsToSelectFrom.length)];
  learningSession.elements.push(newLearningElement);
  return true;
}

function getCardIgnoreMap(
  decks: Deck[],
  learningSession: LearningSession
): CardIgnoreMap {
  const cardIgnoreMap = {} as CardIgnoreMap;
  learningSession.elements.forEach((element) => {
    cardIgnoreMap[
      getKeyForCardIgnoreMap(element.deckId, element.cardId)
    ] = true;
  });
  return cardIgnoreMap;
}

function getKeyForCardIgnoreMap(deckId: number, cardId: number) {
  return `${deckId}:${cardId}`;
}
