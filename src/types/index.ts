export interface FFCFile {
  meta: {
    author: string;
    [x: string]: any;
  };
  decks: {
    [deck_short_name: string]: {
      meta: {
        deck_name: string;
        description: string;
        next_card_id: number;
        [x: string]: any;
      };
      cards: {
        [cardId: string]: {
          q: string;
          a: string;
        };
      };
    };
  };
}

export interface Deck {
  id: number;
  selected: boolean;
  name: string;
  meta: {
    file: {
      [x: string]: any;
    };
    deck: {
      [x: string]: any;
    };
  };
  cards: Card[];
}

export interface Card {
  id: number;
  q: string;
  a: string;
  r?: CardRating[];
}

export interface CardRating {
  t: number;
  r: number;
}

export interface LearningSession {
  elements: LearningSessionElement[];
  currentElementIndex: number;
}

export interface LearningSessionElement {
  deckId: number;
  cardId: number;
  showAnswer?: boolean;
  rating?: number;
  card?: Card;
}

export interface CustomDialogOptions {
  title: string;
  format?: string;
  message?: string;
  tableHead?: {
    name: string;
    value: string;
  };
  table?: CustomDialogOptionsTableRow[];
  buttons?: CustomDialogOptionsButton[];
}

export interface CustomDialogOptionsTableRow {
  name: string;
  value: string;
}

export interface CustomDialogOptionsButton {
  name: string;
  color: string;
  callback?: Function;
}

export enum QuitLearningReason {
  USER_ACTION = 1,
  NO_MORE_CARDS = 2,
}

export enum Event {
  DELETE_SELECTED_DECKS = "deleteSelectedDecks",
  ADD_DECKS_FROM_FILE = "addDecksFromFile",
  ADD_DECKS_FROM_JSON = "addDecksFromJSON",
  SNACKBAR_EVENT = "snackbarEvent",
  CLEAR_LOCAL_STORAGE = "clearLocalStorage",
  SHOW_CUSTOM_DIALOG = "showCustomDialog",
  QUIT_LEARNING = "quitLearning",
  SELECT_ALL_DECKS = "selectAllDecks",
  DESELECT_ALL_DECKS = "deselectAllDecks",
}

export interface NavBarConfigItem {
  to: string;
  icon: string;
  title: string;
}
