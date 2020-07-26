import {
  Event,
  QuitLearningReason,
  CustomDialogOptions,
  CustomDialogOptionsBarChartBar,
} from "../types";

import { clearLearningSessionManagerDataInLocalStorage } from "./learningSessionStorageHelper";

export function finishLearningDialog(
  context: any,
  bars: CustomDialogOptionsBarChartBar[],
  callbackLearningFinished: { (): void }
) {
  const options = {
    title: "Finish Learning?",
    message:
      "You just finished your learning session. Do you want to finish and go to the deck selection?",
    barChart: {
      bars,
    },
    buttons: [
      {
        name: "Review Cards",
        color: "grey",
      },
      {
        name: "Finish",
        color: "indigo",
        callback: () => {
          context.$eventHub.$emit(
            Event.QUIT_LEARNING,
            QuitLearningReason.NO_MORE_CARDS
          );
          clearLearningSessionManagerDataInLocalStorage();
          callbackLearningFinished();
        },
      },
    ],
  } as CustomDialogOptions;
  context.$eventHub.$emit(Event.SHOW_CUSTOM_DIALOG, options);
}
