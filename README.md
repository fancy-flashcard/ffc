# FFC - Fancy FlashCard <!-- omit in toc -->

- [Documentation](#documentation)
  - [Introduction](#introduction)
  - [Terminology](#terminology)
  - [Leaning Progress and Rating of Cards](#leaning-progress-and-rating-of-cards)
  - [Random Card Selection](#random-card-selection)
  - [File Format for External Data Sources](#file-format-for-external-data-sources)
  - [Internal Storing of Decks, Cards and Learning Progress](#internal-storing-of-decks-cards-and-learning-progress)
- [Vue](#vue)
  - [Why Vue?](#why-vue)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
- [Deployment](#deployment)

## Documentation

### Introduction
Of course there are already a lot of flashcard apps, but they all lack a feature we consider very convenient.
The feature we are talking about is using multiple selected card decks in one session without switching between decks manually.
Our goal with this app is to provide a simple and easy to use Progressive Web App foundation.
This foundation consists of a simple storing approach for Q&A-pairs as well as a progression system to support a users learning journey.
In general we want to make it possible to add/import decks as easy as possible to enable anyone to use the app for their purposes.

To understand how it all works please read this README, we try to cover our every thought.
If you have any questions about our ideas, feel free to contact us.

### Terminology
Decks can be imported via files.
Files can be stored locally or accessed online via an URL.
Each file contains multiple decks.
Each deck is identified by a short name / id (only inside this file).
It then contains some meta data (full name, description, ...) and multiple cards (questions with corresponding answers), each identified by some incrementing number (the next value is stored in the meta data so that there are no collisions when cards are deleted).
You can find the file format for such files below.

A card (question-answer-pair) is uniquely identified by the data source identifier (e.g. URL where the file is hosted, local filepath, ...), the deck short name / id and the id of the card itself (inside the deck).

### Leaning Progress and Rating of Cards
The learning progress is stored locally in the app.
After revealing an answer, the user can rate how hard/easy it was (e.g. on a scale from 1 to 5; 1=hard, 5=easy).
For each card an array of objects like  ``{ "timestamp": "...", "rating": 50 }`` is stored.
Internally the rating is always stored on a scale from 0 to 100 (indepentend of what the users sees and selects; makes more precise adjustments easier in the future).
The rating which is displayed to the user must be mapped, e.g. 1 &rarr; 0, 2 &rarr; 25, ..., 5 &rarr; 100.

### Random Card Selection
The user can select one or multiple decks for learning (and maybe limit time or number of cards).
The selection of cards is done by an algorithm, which can be replaced or adjusted.
Our first proposal is as follows:
 * we downgrade the rating of each card based on time and rating when user rated it the last time
 * this leads to a virtual rating for each card
 * when the next card needs to be displayed, we choose randomly from all the cards based on the virtual rating (low rating = higher probabilty of being chosen)

### File Format for External Data Sources
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
        "cards": {
            "0": {
                "q": "question",
                "a": "answer"
            },
            "2": {
                "q": "question",
                "a": "answer"
            }
        }
    },
    "...": {}
}
````

### Internal Storing of Decks, Cards and Learning Progress
````json
{
    "deck_id": {
        "meta": {
            "url": "URL of File",
            "last_updated": "Timestamp of Last Update",
            "file_meta": {
                "author": "Name of the Author",
                "...": "..."
            },
            "deck_meta": {
                "short_name": "Short Name of the Deck",
                "deck_name": "Full Name of the Deck",
                "description": "Description",
                "next_id": 3,
                "...": "..."
            }
        },
        "cards": {
            "0": {
                "q": "question",
                "a": "answer",
                "r": [
                    { "t": "Timestamp When This Card Has Been Rated", "r": 50 }
                ]
            },
            "...": "..."
        }
    },
    "...": "..."
}
````


## Vue

### Why Vue?

- easier to learn/use (compared to e.g. React and Angular)
- community backed
- lightweight
- easy to expand

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment

The app is build and deployed to https://dhbw-ffc.github.io/ffc on every push to master branch (via GitHub Actions and GitHub Pages).
