import Vue from 'vue';
import { Deck, CustomDialogOptions } from '@/types';
import router from '@/router';

interface Context {
  numberOfSelectedDecks: number,
  $eventHub: typeof Vue,
  decks: Deck[],
  deselectAll: Function,
  $router: typeof router,
}

export function deleteSelected(context: any) {
  const options = {
    title: `Delete Deck${context.numberOfSelectedDecks > 1 ? "s" : ""}?`,
    message: `Do you really want to delete the ${
      context.numberOfSelectedDecks > 1
        ? context.numberOfSelectedDecks + " "
        : ""
    }selected
          deck${context.numberOfSelectedDecks > 1 ? "s" : ""}?`,
    buttons: [
      {
        name: "Cancel",
        color: "grey",
      },
      {
        name: "Delete",
        color: "red darken-1",
        callback: () => {
          context.$eventHub.$emit("deleteSelectedDecks");
        },
      },
    ],
  };
  context.$eventHub.$emit("showCustomDialog", options);
}

export function showInfoForSelectedDeck(context: any) {
  const selectedDeck = context.decks.find((deck: any) => deck.selected);
  const options = {
    title: selectedDeck?.name,
    table: [],
    buttons: [
      {
        name: "Close",
        color: "indigo",
      },
    ],
  } as CustomDialogOptions;
  const infos = [
    {
      meta: "file",
      content: [
        {
          key: "author",
          name: "Author",
        },
        {
          key: "version",
          name: "Version",
        },
      ],
    },
    {
      meta: "deck",
      content: [
        {
          key: "description",
          name: "Description",
        },
      ],
    },
  ];
  for (const info of infos) {
    for (const content of info.content) {
      if (info.meta === "file") {
        options.table?.push({
          name: content.name,
          value: selectedDeck?.meta.file[content.key] || "-",
        });
      } else if (info.meta === "deck") {
        options.table?.push({
          name: content.name,
          value: selectedDeck?.meta.deck[content.key] || "-",
        });
      }
    }
  }
  options.table?.push({
    name: "Number of Cards",
    value: String(selectedDeck?.cards.length || 0),
  });
  context.$eventHub.$emit("showCustomDialog", options);
}
