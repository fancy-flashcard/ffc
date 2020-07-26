import { FFCFile, Deck, Card, CustomDialogOptions } from "@/types";
import router from "@/router";
import { showSnackbar } from "./snackbarHelper";

interface Context {
  decks: Deck[];
  showCustomDialog: Function;
  $router: typeof router;
}

export function addDecksFromFile(
  context: Context,
  fileContent: string,
  url?: string
) {
  try {
    addDecksFromJSON(context, JSON.parse(fileContent), url);
  } catch (e) {
    showSnackbar(context, e);
  }
}

interface addedDeckAndCards {
  name: string;
  numberOfCards: number;
  addedCards?: number;
  updatedCards?: number;
  deletedCards?: number;
}

export function addDecksFromJSON(
  context: Context,
  fileContent: FFCFile,
  url?: string
) {
  const addedDecksAndCards = [] as addedDeckAndCards[];
  try {
    let updatedInsteadOfAddedFile = false;
    for (const deckShortName in fileContent.decks) {
      const cards: Card[] = [];
      for (const cardId in fileContent.decks[deckShortName].cards) {
        cards.push({
          id: Number(cardId),
          q: fileContent.decks[deckShortName].cards[cardId].q,
          a: fileContent.decks[deckShortName].cards[cardId].a,
          r: [],
        });
      }

      // check if deck exists already
      const updated = updateDeckIfItExistsAndReturnStatusAndNumberOfCards(
        context.decks,
        deckShortName,
        fileContent,
        url
      );
      if (updated.status) {
        updatedInsteadOfAddedFile = true;
        addedDecksAndCards.push({
          name: updated.deckName || "",
          numberOfCards: cards.length,
          addedCards: updated.addedCards,
          updatedCards: updated.updatedCards,
          deletedCards: updated.deletedCards,
        });
        continue;
      }

      const name =
        fileContent.decks[deckShortName].meta.deck_name || deckShortName;
      context.decks.push({
        id: context.decks.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1,
        selected: false,
        name,
        meta: {
          file: {
            ...fileContent.meta,
            url,
          },
          deck: {
            ...fileContent.decks[deckShortName].meta,
            short_name: deckShortName,
          },
        },
        cards,
      });
      addedDecksAndCards.push({ name, numberOfCards: cards.length });
    }

    const version = fileContent?.meta?.version;

    showAddedDecksConfirmation(
      context,
      addedDecksAndCards,
      version,
      updatedInsteadOfAddedFile
    );
  } catch (e) {
    showSnackbar(context, e);
  }
}

function updateDeckIfItExistsAndReturnStatusAndNumberOfCards(
  decks: Deck[],
  deckShortName: string,
  fileContent: FFCFile,
  url?: string
): {
  status: boolean;
  deckName?: string;
  addedCards?: number;
  updatedCards?: number;
  deletedCards?: number;
} {
  for (const deck of decks) {
    // if url is known for the local deck, it should only be updated when url matches
    // this should prevent from maliciously using same uuid to overwrite other decks
    if (
      ((deck.meta.file.url && deck.meta.file.url === url) ||
        (!deck.meta.file.url &&
          deck.meta.file.uuid &&
          deck.meta.file.uuid === fileContent.meta.uuid)) &&
      deck.meta.deck.short_name === deckShortName
    ) {
      // should be updated
      let addedCards = 0,
        updatedCards = 0,
        deletedCards = 0;

      deck.name =
        fileContent.decks[deckShortName].meta.deck_name || deckShortName;
      deck.meta = {
        file: {
          ...fileContent.meta,
          url: deck.meta.file.url,
        },
        deck: {
          ...fileContent.decks[deckShortName].meta,
          short_name: deckShortName,
        },
      };
      const alreadyExistingCardIdMap: { [cardId: number]: boolean } = {};
      for (let i = 0; i < deck.cards.length; i++) {
        if (deck.cards[i].id in fileContent.decks[deckShortName].cards) {
          if (
            deck.cards[i].q !==
              fileContent.decks[deckShortName].cards[deck.cards[i].id].q ||
            deck.cards[i].a !==
              fileContent.decks[deckShortName].cards[deck.cards[i].id].a
          ) {
            deck.cards[i].q =
              fileContent.decks[deckShortName].cards[deck.cards[i].id].q;
            deck.cards[i].a =
              fileContent.decks[deckShortName].cards[deck.cards[i].id].a;
            updatedCards += 1;
          }
          alreadyExistingCardIdMap[deck.cards[i].id] = true;
        } else {
          deck.cards.splice(i, 1);
          deletedCards += 1;
        }
      }
      for (const cardId in fileContent.decks[deckShortName].cards) {
        if (cardId in alreadyExistingCardIdMap) continue;
        deck.cards.push({
          id: Number(cardId),
          q: fileContent.decks[deckShortName].cards[cardId].q,
          a: fileContent.decks[deckShortName].cards[cardId].a,
          r: [],
        });
        addedCards += 1;
      }
      return {
        status: true,
        deckName: deck.name,
        addedCards,
        updatedCards,
        deletedCards,
      };
    }
  }
  return { status: false };
}

function showAddedDecksConfirmation(
  context: Context,
  addedDeckAndCards: addedDeckAndCards[],
  version: string,
  updatedInsteadOfAddedFile: boolean
) {
  const numberOfAddedCards = addedDeckAndCards.reduce(
    (total, deck) => total + deck.numberOfCards,
    0
  );
  if (numberOfAddedCards === 0) {
    throw new Error("No decks have been added");
  }

  const options = {
    persistent: false,
    title: "Successfully Imported Decks",
    message: updatedInsteadOfAddedFile
      ? "Following decks have been updated" +
        (version ? " to version " + version : "") +
        " (number of cards added / updated / deleted):"
      : "The following decks" +
        (version ? " (version: " + version + ") " : "") +
        "have been added:",
    tableHead: { name: "Deck", value: "Number of Cards" },
    table: addedDeckAndCards.map((deck) => {
      return {
        name: deck.name,
        value:
          String(deck.numberOfCards) + showUpdatedInfoForDeckIfUpdated(deck),
      };
    }),
    buttons: [
      {
        name: "Close",
        color: "grey",
      },
      {
        name: "Go Home",
        color: "indigo",
        callback: function() {
          context.$router.push("/");
        },
      },
    ],
  } as CustomDialogOptions;
  context.showCustomDialog(options);
}

function showUpdatedInfoForDeckIfUpdated(deck: addedDeckAndCards): string {
  if (
    "addedCards" in deck &&
    "updatedCards" in deck &&
    "deletedCards" in deck
  ) {
    return ` (${deck.addedCards}/${deck.updatedCards}/${deck.deletedCards})`;
  }
  return "";
}
