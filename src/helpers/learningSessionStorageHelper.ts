import LearningSessionManager from "./learningSessionManager";
import { set, get, remove } from "./localStorageHelper";

const LS_NAME_LEARNING_SESSION_MANAGER_DATA = "learningSessionManagerData";

export function saveLearningSessionManagerDataToLocalStorage(
  learningSessionManager: LearningSessionManager
) {
  set(
    LS_NAME_LEARNING_SESSION_MANAGER_DATA,
    JSON.stringify(learningSessionManager)
  );
}

export function getLearningSessionManagerDataFromLocalStorage() {
  try {
    const learningSessionMangerData = JSON.parse(
      get(LS_NAME_LEARNING_SESSION_MANAGER_DATA)
    );
    if (!checkIfDataIsLearningSessionManagerData(learningSessionMangerData)) {
      throw new Error(
        "Stored data is broken and can not be used to create a learning session manager"
      );
    }
    return learningSessionMangerData;
  } catch (error) {
    return null;
  }
}

export function clearLearningSessionManagerDataInLocalStorage() {
  remove(LS_NAME_LEARNING_SESSION_MANAGER_DATA);
}

function checkIfDataIsLearningSessionManagerData(
  learningSessionManager: LearningSessionManager
): boolean {
  if (!learningSessionManager) return false;
  for (const attribute of [
    "decks",
    "numberOfRecentCardsToIgnoreWhenSelectingNextCard",
    "cardsToSelectFrom",
    "learningSession",
  ]) {
    if (!(attribute in learningSessionManager)) {
      return false;
    }
  }

  return true;
}
