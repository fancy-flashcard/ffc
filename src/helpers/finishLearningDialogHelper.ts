import { Event, QuitLearningReason } from "../types";

export function finishLearningDialog(context: any) {
  context.$eventHub.$emit(Event.SHOW_CUSTOM_DIALOG, {
    title: "Finish Learning?",
    message:
      "You just finished your learning session. Do you want to finish and go to the deck selection?",
    buttons: [
      {
        name: "Go Back",
        color: "grey"
      },
      {
        name: "Finish",
        color: "indigo",
        callback: () => {
          context.$eventHub.$emit(
            Event.QUIT_LEARNING,
            QuitLearningReason.NO_MORE_CARDS
          );
        }
      }
    ]
  });
}
