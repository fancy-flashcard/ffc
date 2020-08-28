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
  context.$eventHub.$on(Event.DELETE_SELECTED_DECKS, () => {
    context.decks = context.decks.filter((deck: Deck) => !deck.selected);
  });
  context.$eventHub.$on(Event.SELECT_ALL_DECKS, () => {
    context.setSelectedStatusForAllDecks(true);
  });
  context.$eventHub.$on(Event.DESELECT_ALL_DECKS, () => {
    context.setSelectedStatusForAllDecks(false);
  });
  context.$eventHub.$on(Event.ADD_DECKS_FROM_FILE, (fileContent: string) => {
    addDecksFromFile(context, fileContent);
  });
  context.$eventHub.$on(
    Event.ADD_DECKS_FROM_JSON,
    (fileContent: FFCFile, url?: string) => {
      addDecksFromJSON(context, fileContent, url);
    }
  );
  context.$eventHub.$on(Event.SNACKBAR_EVENT, (message: string) => {
    showSnackbar(context, message);
  });
  context.$eventHub.$on(Event.CLEAR_LOCAL_STORAGE, () => {
    clearLocalStorage(context);
  });
  context.$eventHub.$on(
    Event.SHOW_CUSTOM_DIALOG,
    (options: CustomDialogOptions) => {
      context.showCustomDialog(options);
    }
  );
  context.$eventHub.$on(Event.QUIT_LEARNING, (reason: QuitLearningReason) => {
    if (reason === QuitLearningReason.NO_MORE_CARDS) {
      context.setSelectedStatusForAllDecks(false);
    }
    context.$router.replace("/");
  });
  context.$eventHub.$on(Event.UPDATE_CARD_LIMIT, (newValue: string) => {
    context.cardLimit = newValue;
  });
}
