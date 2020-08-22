import { Event } from "../types";

export function clearLocalStorageDialog(context: any) {
  context.$eventHub.$emit("showCustomDialog", {
    title: "Clear Storage?",
    message:
      "Do you really want to clear your local storage? Every deck and learning progress will be lost.",
    buttons: [
      {
        name: "Cancel",
        color: "grey",
      },
      {
        name: "Clear Storage",
        color: "orange darken-1",
        callback: () => {
          context.$eventHub.$emit(
            Event.CLEAR_LOCAL_STORAGE
          );
        },
      },
    ],
  });
}
