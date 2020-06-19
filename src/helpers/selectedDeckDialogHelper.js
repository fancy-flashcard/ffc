export function deleteSelected(context) {
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

export function showInfoForSelectedDeck(context) {
  const selectedDeck = context.decks.find((deck) => deck.selected);
  const options = {
    title: selectedDeck.name,
    table: [],
    buttons: [
      {
        name: "Close",
        color: "indigo",
      },
    ],
  };
  const infos = [
    {
      meta: "file",
      content: [
        {
          key: "author",
          name: "Author",
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
      options.table.push({
        name: content.name,
        value: selectedDeck.meta[info.meta][content.key] || "-",
      });
    }
  }
  options.table.push({
    name: "Number of Cards",
    value: selectedDeck.cards.length,
  });
  context.$eventHub.$emit("showCustomDialog", options);
}

export function quitLearning(context) {
  context.$eventHub.$emit("showCustomDialog", {
    title: "Quit Learning?",
    message:
      "Do you really want to quit learning? Nevertheless, your progress is saved.",
    buttons: [
      {
        name: "Cancel",
        color: "grey"
      },
      {
        name: "Quit",
        color: "orange darken-1",
        callback: () => {
          context.deselectAll();
          context.$router.replace("/");
        }
      }
    ]
  });
}