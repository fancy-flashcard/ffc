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
  r?: Rating[];
}

export interface Rating {
  t: number;
  r: number;
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
