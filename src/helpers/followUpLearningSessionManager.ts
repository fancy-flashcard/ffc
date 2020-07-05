import LearningSessionManager from "./learningSessionManager";

export default class FollowUpLearningSessionManager extends LearningSessionManager {
  constructor(data: LearningSessionManager) {
    super(data.decks, data.numberOfRecentCardsToIgnoreWhenSelectingNextCard);
    this.cardsToSelectFrom = data.cardsToSelectFrom;
    this.learningSession = data.learningSession;
  }
}
