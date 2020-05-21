# FFC - fancy flashcard

File format of flashcard decks:
````json
{
    "meta": {
        "author": "Name of the Author",
        "...": "..."
    },
    "deck_short_name": {
        "meta": {
            "deck_name": "Full Name of the Deck",
            "description": "Description",
            "next_id": 3,
            "...": "..."
        },
        "0": {
            "q": "question",
            "a": "answer"
        },
        "2": {
            "q": "question",
            "a": "answer"
        }
    },
    "...": {}
}
````

Each file contains multiple decks.
Each deck is identified by a short name / id.
It then contains some meta data (full name, description, ...) and multiple cards (questions with corresponding answers), each identified by some incrementing number (the next value is stored in the meta data so that there are no collisions when cards are deleted).

A card (question-answer-pair) is uniquely identified by the URL where the file is hosted (alternatively the local filepath), the deck short name / id and the card-id.

The learning progress is stored locally in the app.
After revealing an answer, the user can rate how hard/easy it was (scale from 1 to 5; 1=hard, 5=easy).
For each card an array of objects like  ``{ "timestamp": "...", "rating": 3 }`` is stored.

The user can select one or multiple decks for learning (and maybe limit time or number of cards).
The selection of cards is done by an algorithm, which can be replaced or adjusted.
Our first proposal is as follows:
 * we downgrade the rating of each card based on time and rating when user rated it the last time
 * this leads to a virtual rating for each card
 * when the next card needs to be displayed, we choose randomly from all the cards based on the virtual rating (low rating = higher probabilty of being chosen)


# Vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
