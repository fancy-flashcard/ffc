import {
  QuitLearningReason,
  CustomDialogOptions,
  FFCFile,
  Event,
  Deck,
} from "@/types";
import { clearLocalStorage } from "./localStorageHelper";
import { addDecksFromJSON, addDecksFromFile } from "./addDecksHelper";
import { showSnackbar } from "./snackbarHelper";

export function registerEventListenerForMainApp(context: any) {
  context.$eventHub.$on("deleteSelectedDecks", () => {
    context.decks = context.decks.filter((deck: Deck) => !deck.selected);
  });
  context.$eventHub.$on(Event.SELECT_ALL_DECKS, () => {
    context.setSelectedStatusForAllDecks(true);
  });
  context.$eventHub.$on(Event.DESELECT_ALL_DECKS, () => {
    context.setSelectedStatusForAllDecks(false);
  });
  context.$eventHub.$on("addDecksFromFile", (fileContent: string) => {
    addDecksFromFile(context, fileContent);
  });
  context.$eventHub.$on("addDecksFromJSON", (fileContent: FFCFile) => {
    addDecksFromJSON(context, fileContent);
  });
  context.$eventHub.$on("snackbarEvent", (message: string) => {
    showSnackbar(context, message);
  });
  context.$eventHub.$on("clearLocalStorage", () => {
    clearLocalStorage(context);
  });
  context.$eventHub.$on("showCustomDialog", (options: CustomDialogOptions) => {
    context.showCustomDialog(options);
  });
  context.$eventHub.$on("quitLearning", (reason: QuitLearningReason) => {
    if (reason === QuitLearningReason.USER_ACTION) {
      context.$router.replace("/");
    }
  });
}
