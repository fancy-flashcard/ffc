import { FFCFile, Deck, CustomDialogOptions } from '@/types';
import router from '@/router';
import { showSnackbar } from './snackbarHelper';

interface Context {
  decks: Deck[],
  showCustomDialog: Function,
  $router: typeof router,
}

export function addDecksFromFile(context: Context, fileContent: string) {
  try {
    addDecksFromJSON(context, JSON.parse(fileContent));
  } catch (e) {
    showSnackbar(context, e);
  }
}

interface addedDeckAndCards {
  name: string,
  numberOfCards: number,
}

export function addDecksFromJSON(context: Context, fileContent: FFCFile) {
  const addedDecksAndCards = [] as addedDeckAndCards[];
  try {
    for (const deckShortName in fileContent.decks) {
      const cards = [];
      for (const cardId in fileContent.decks[deckShortName].cards) {
        cards.push({
          id: Number(cardId),
          q: fileContent.decks[deckShortName].cards[cardId].q,
          a: fileContent.decks[deckShortName].cards[cardId].a,
          r: [],
        });
      }

      const name =
        fileContent.decks[deckShortName].meta.deck_name || deckShortName;
      context.decks.push({
        id: context.decks.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1,
        selected: false,
        name,
        meta: {
          file: fileContent.meta,
          deck: {
            ...fileContent.decks[deckShortName].meta,
            short_name: deckShortName,
          },
        },
        cards,
      });
      addedDecksAndCards.push({ name, numberOfCards: cards.length });
    }

    showAddedDecksConfirmation(context, addedDecksAndCards);
  } catch (e) {
    showSnackbar(context, e);
  }
}

function showAddedDecksConfirmation(context: Context, addedDeckAndCards: addedDeckAndCards[]) {
  const numberOfAddedCards = addedDeckAndCards.reduce(
    (total, deck) => total + deck.numberOfCards,
    0
  );
  if (numberOfAddedCards === 0) {
    throw new Error("No decks have been added");
  }

  const options = {
    title: "Successfully Imported Decks",
    message: "Following decks have been added:",
    tableHead: { name: "Deck", value: "Number of Cards" },
    table: addedDeckAndCards.map((deck) => {
      return {
        name: deck.name,
        value: String(deck.numberOfCards),
      };
    }),
    buttons: [
      {
        name: "Close",
        color: "indigo",
        callback: function() {
          context.$router.push("/");
        },
      },
    ],
  } as CustomDialogOptions;
  context.showCustomDialog(options);
}
