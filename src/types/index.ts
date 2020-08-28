export interface FFCFile {
  meta: {
    author: string;
    uuid?: string;
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
      uuid?: string;
      url?: string;
      [x: string]: any;
    };
    deck: {
      short_name: string;
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
  rating?: CardRating;
  card?: Card;
  weight?: number;
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
  barChart?: CustomDialogOptionsBarChart;
  buttons?: CustomDialogOptionsButton[];
}

export interface CustomDialogOptionsTableRow {
  name: string;
  value: string;
}

export interface CustomDialogOptionsBarChart {
  bars: CustomDialogOptionsBarChartBar[];
}

export interface CustomDialogOptionsBarChartBar {
  name?: string;
  value: number;
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
  PREPARE_QUIT_LEARNING = "prepareQuitLearning",
  SELECT_ALL_DECKS = "selectAllDecks",
  DESELECT_ALL_DECKS = "deselectAllDecks",
  SWIPE_LEFT_IN_LEARN = "swipeLeftInLearn",
  SWIPE_RIGHT_IN_LEARN = "swipeRightInLearn",
  UPDATE_CARD_LIMIT = "updateCardLimit",
}

export interface NavBarConfigItem {
  to: string;
  icon: string;
  title: string;
}

export interface ThirdPartyDeck {
  type: string;
  name: string;
  author: string;
  desc: string;
  url: string;
}
