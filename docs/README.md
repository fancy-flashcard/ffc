# Documentation <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [TL;DR](#tldr)
  - [Introduction](#introduction)
  - [Terminology](#terminology)
- [The idea behind Fancy Flashcard](#the-idea-behind-fancy-flashcard)
- [Architecture](#architecture)
  - [Progressive Web App](#progressive-web-app)
  - [Decentralized persistence](#decentralized-persistence)
  - [Component based](#component-based)
- [UI Design](#ui-design)
- [Technology](#technology)
  - [Why Vue?](#why-vue)
  - [Why Vuetify?](#why-vuetify)
  - [Local Storage for storing data](#local-storage-for-storing-data)
  - [Offline Availability](#offline-availability)
  - [Technical insights and how we did it](#technical-insights-and-how-we-did-it)
    - [Learning Progress and Rating of Cards](#learning-progress-and-rating-of-cards)
    - [Random Card Selection](#random-card-selection)
    - [File Format for External Data Sources](#file-format-for-external-data-sources)
    - [Internal Storing of Decks, Cards and Learning Progress](#internal-storing-of-decks-cards-and-learning-progress)
- [Monetization](#monetization)
  - [Educational App](#educational-app)
  - [Third Party Decks: Curated, Featured & Sponsored Decks](#third-party-decks-curated-featured--sponsored-decks)
  - [Arrange contact to private tutors](#arrange-contact-to-private-tutors)
  - [Closing words on monetization](#closing-words-on-monetization)
- [Testing](#testing)
  - [Static tests](#static-tests)
  - [Dynamic tests & Manual tests](#dynamic-tests--manual-tests)
- [Backlog](#backlog)
  - [Some ideas](#some-ideas)
  - [_FFQuiz_ - Fancy FlashQuiz](#ffquiz---fancy-flashquiz)

## TL;DR

### Introduction
Of course there are already a lot of flashcard apps, but they all lack a feature we consider very convenient.
The feature we are talking about is using multiple selected card decks in one session without switching between decks manually.
Our goal with this app is to provide a simple and easy to use [Progressive Web App](https://web.dev/progressive-web-apps/) foundation.
This foundation consists of a simple storing approach for Q&A-pairs as well as a progression system to support a users learning journey.
In general we want to make it possible to add/import decks as easy as possible to enable anyone to use the app for their purposes.

To understand how it all works please read this README, we try to cover our every thought.
If you have any questions about our ideas, feel free to contact us.

### Terminology
Decks can be imported via files.
Files can be stored locally or accessed online via a URL.
Each file contains multiple decks.
Each deck is identified by a short name / id (only inside this file).
It then contains some meta data (full name, description, ...) and multiple cards (questions with corresponding answers), each identified by some incrementing number (the next value is stored in the meta data so that there are no collisions when cards are deleted).
You can find the file format for such files below.

A card (question-answer-pair) is uniquely identified by the data source identifier (e.g. URL where the file is hosted, local filepath, ...), the deck short name / id and the id of the card itself (inside the deck).

## The idea behind Fancy Flashcard

Flashcards are usually used for learning languages and for that you mostly want to learn only one language at a given time.
And there is the catch of most apps.
You simply can not learn multiple decks at once and have to create new mixed decks if you want to overcome this obstacle.
Our idea was to simply choose which deck you want to include when learning.
This way you do not have to repeat yourself over and over if you want to mix some decks while learning.
There is one particular scenario we had in mind: Our finals.
We have to learn every topic we had lectures on and its simply annoying to create a lot of mixed decks to accomodate for every possible situation.
That is why we created **Fancy Flashcard (FFC)**.

FFC originated from the idea of combining the ease of use of index cards and their flexibility.
With physical index cards you can simply mix the learning decks you want, no matter the topic.
We tried to do the same with FFC by allowing the user to combine two or more decks for a learning session.

To us this is a kind of small revolution for digital learning and the concept of a paperless and therefore more environmently oriented world.
We want to shift the focus away from writing thousands of index cards in schools or universities every year and instead embrace the digital world and its possibilities.
With FFC you can easily create decks and share them with your friends.
This will not only make your life easier, because you don't need to write every index card yourself or use a copier to be able to share your decks, it will also make the learning process more social, because you can simply use the decks in learning games.

Because of the simple structure of our decks they can be easily integrated in all sort of apps.
This is where we see one of the best parts of e-learning.
The ability to cooperate with others in e.g. quiz games where you and your friends compete.
Especially in a global crisis, like the COVID-19 pandemic in 2020, digitial learning is one of the most important achievements in modern history.
With FFC we try to give people the opportunity to educate themselves in their own homes and help the young generation to be able to learn everywhere they want for as long as they want.

To sum it up, FFC is as good as physical index cards but you will not have to carry the cards with you to be able to learn on your commute to school/work or when you have a few minutes of free time and don't know what to do.

## Architecture

### [Progressive Web App](https://web.dev/progressive-web-apps/)

We decided to create a [Progressive Web App (PWA)](https://web.dev/progressive-web-apps/) instead of a native app because it's easier and cheaper to develop and maintain.
This choice was realitively easy, as we already had experiences with web development and believe in the future of [PWAs](https://web.dev/progressive-web-apps/).
This is simply because [PWAs](https://web.dev/progressive-web-apps/) radically facilitate onboarding for users and can be accessed from any device (even computers) as long as they have a web browser supporting it.

By creating a [PWA](https://web.dev/progressive-web-apps/) we can easily deploy our app on the web and are not forced to offer it on each app store to cater to every mobile user.
This also allows us to focus on developing more features instead of multiple versions of the same application for each major operating system.
In addition we are allowed to publish the [PWA](https://web.dev/progressive-web-apps/) to the Google Play Store via the Trusted Web Activity (TWA) API or get it listed in the Apple App Store.
Apps installed via these stores have the ability to ask the user for more permissions, like displaying a notification.
Because we did not plan on using notifications or any other special features in our first iterations it is simply unnecessary to invest the time and money ([Google Play Store: $25 one time fee](https://play.google.com/apps/publish/) - [Apple App Store: $99 per year](https://developer.apple.com/programs/how-it-works/)) into getting the app into these stores.
This may change with time because most users do not know how to install a web app and simple use the respective app stores for finding new apps.

### Decentralized persistence

To ensure the highest possible level of privacy and data protection we decided for a completely decentralized app and therefore without any dependancy on central servers or their availability.
That means all learning progress is stored on users devices so they don't need to fear tracking or espionage, you can read about our motives for this in chapter [Monetization](#monetization).
Anyone can offer decks for download online or simply export them as a file to later be imported by another user, as long as the decks use our supported format.

With our decentralized approach we do not need any kind of authentication, that may be used to gather information about you (e.g. O-Auth via Facebook) or introduces any threats concerning users data.
For the app all users are the same and you simply work with **your local** data.
This may be seen as a disadvantage, because you cannot simply switch devices in learning sessions, but we believe this trade off is worth your privacy.
We maybe add some privacy-preserving sync-mechanism in the future, see our [Backlog](#backlog).

### Component based

In [Vue.js](https://vuejs.org/) the web app is structured into components, each fulfilling a single purpose.
By splitting into small clearly arranged parts, the code is easier to understand and to maintain.
As we use single file components the layout, styling and logic can be found in one file for each component.
One might argue that having HTML, JavaScript and CSS mixed up in one file is contrary to separation of concerns, but we found it very convenient to have all stuff for a certain purpose in one file and not splitted into three.
As highlighted in the [Vue.js docs](https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns) separation of concerns is not about separation of file types.
[Vue.js](https://vuejs.org/) offers to split JavaScript and CSS into distinct files but as mentioned above it helped to see all code belonging together in one file.

Additionally we moved some of the code to helper files, making it possible to reduce size of the components and thus increasing readability.

## UI Design

The UI design of the app was chosen by us developers, because we are the first users of our app.
We decided to use an overall darkmode for the app to reduce eye strain when learning in the evening or in dark environments.

Every aspect of the app is designed to support one hand use no matter the screen size.
We added the ability to swipe to the right to open the menu and added different design elements (like our logo) at certain locations to naturally move the complete user interaction to the bottom half of the screen. (This aspect is easily seen in the learning process.)

We also decided to use [Vuetify](https://vuetifyjs.com/) and the _Material Design_ provided by it.
This made development easier and quicker, because we could use already existing code and did not have to create our own templates.

_Material Design_, responsiveness and a generally appealing design is a must-have for our app, simply because we expect it to be used almost exclusively on mobile devies.

## Technology

### Why Vue?

[Vue.js](https://vuejs.org/) is a community backed and lightweight frontend framework.
Compared to React and Angular it's easier to learn and get started right away.
Apart from the advantage for us, we also see the chance that others can contribute more easily.
All this is of course aided by the ease of use and broadly available documentation of [Vue.js](https://vuejs.org/).

Additionally [Vue.js](https://vuejs.org/) offers the possibility to use [TypeScript](https://www.typescriptlang.org/) so that we could take advantage of using typing and static code checks.

### Why [Vuetify](https://vuetifyjs.com/)?

[Vuetify](https://vuetifyjs.com/) is a library with many UI components for Material Design.
It's widely used and well documented.
We chose to add it to our project because we wanted our app to comply with [Material Design Guidlines](https://material.io) and it really helped us to create beautiful user interfaces quickly.

### Local Storage for storing data

As we decided for a decentral approach, we somehow needed to store data client-side.
Among all the possibilites we decided for Local Storage because it's very simple and satisfies exactly what we need:
storing key-value-pairs without any overhead.

### Offline Availability

To make [PWAs](https://web.dev/progressive-web-apps/) feel like native apps, a Service Worker is required.
It offers the possibility to cache data and resources which makes our app work offline.
In the future the Service Worker may help us by offering access to notifications.

Additionally we make our app installable by providing a manifest, thus users can add it to their homescreen and it feels like a natie app.

### Technical insights and how we did it

#### Learning Progress and Rating of Cards
The learning progress is stored locally in the app.
After revealing an answer, the user can rate how hard/easy it was (e.g. on a scale from 1 to 5; 1=hard, 5=easy).
For each card an array of objects like  ``{ "timestamp": "...", "rating": 50 }`` is stored.
Internally the rating is always stored on a scale from 0 to 100 (indepentend of what the users sees and selects; makes more precise adjustments easier in the future).
The rating which is displayed to the user must be mapped, e.g. 1 &rarr; 0, 2 &rarr; 25, ..., 5 &rarr; 100.

#### Random Card Selection
The user can select one or multiple decks for learning (and maybe limit time or number of cards).
The selection of cards is done by an algorithm, which can be replaced or adjusted.
Our first proposal is as follows:
 * we downgrade the rating of each card based on time and rating when user rated it the last time
 * this leads to a virtual rating for each card
 * when the next card needs to be displayed, we choose randomly from all the cards based on the virtual rating (low rating = higher probabilty of being chosen)

#### File Format for External Data Sources
````json
{
    "meta": {
        "author": "Name of the Author",
        "...": "..."
    },
    "decks": {
        "deck_short_name": {
            "meta": {
                "deck_name": "Full Name of the Deck",
                "description": "Description",
                "next_card_id": 3,
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
}
````
You can find an example file and a command line interface to create and edit such files in the [cli folder of this repository](../cli).

Such files can be either loaded as a local file or from a URL.
The latter one can easily be done if CORS headers are present but it might be that not everyone is able to configure this (e.g. static file server).
See [no-cors.md](no-cors.md) for ideas how Same-origin policy can be bypassed without CORS.

#### Internal Storing of Decks, Cards and Learning Progress
````json
{
    "decks": [{
        "id": 1,
        "selected": false,
        "name": "Name of the Deck (uses deck_name or deck_short_name as a fallback)",
        "meta": {
            "file": {
                "author": "Name of the Author",
                "...": "..."
            },
            "deck": {
                "short_name": "Short Name of the Deck",
                "name": "Full Name of the Deck",
                "description": "Description",
                "next_card_id": 3,
                "...": "..."
            }
        },
        "cards": [
            {
                "id": 1,
                "q": "question",
                "a": "answer",
                "r": [
                    { "t": "Timestamp When This Card Has Been Rated", "r": 50 },
                    { "t": 1590866520000, "r": 99}
                ]
            },
            { "...": "..."}
        ]
    },
    { "...": "..."}
    ]
}
````

## Monetization

Sooner or later every app publisher thinks about monetization in some form.
A vast majority chooses an ad based monetization system.
On the one hand that doesn't make much sense because we prefer an open source model and anyone could fork the repository and diable ads.
On the other hand users can easily install addons in their browsers to block ads.
Additionally such an ad based monetization system often leads to an app with around 50% of the available display area filled with ads.
Because of this many users despise this sort of monetization and will opt to other apps instead, especially if the app has a small user base or is easily replaceable.
We try to combat this with a few ideas of our own.

### Educational App

Our first idea is about education and ability to easily access it.
Because of this we want to create specialized versions of the app with pre-installed decks or deck selection menus for every customer.
Customers can be private companies and public institutions like schools or universities that pay a comparably small fee to have this web app adjusted to their needs and get help rolling it out.
This repository being open source and under the MIT License will also be available for those customers to adjust on their own without any cost connected to it.
Our goal with this is to accumulate more users and introduce the app as the de facto standard for educational purposes.

How does it work though?
It's pretty simple, we create a deck selection instead of the deck creator on the import page.
This deck selection will be fed by a JSON file hosted by us or the company/school and will include all decks created by the school.
Users will simply choose a deck they want and add it to their own collection.
To avoid misuse we could disable the URL import and only allow users to choose the given decks.

Ease of use is the focus of an educational app and users should enjoy using it.
Because of this our long term goal would be to enable the app to be used for educational purposes simply by submitting a code created for your company or school.
With this idea we eliminate the need of specialized apps as well as a lot of support and thus lower the cost of development in the long term.

### Third Party Decks: Curated, Featured & Sponsored Decks

Another monetization idea are third party decks.
With third party decks we create a space for companies and users to get their decks featured and seen by every user in the app.
These decks will use the same deck selection as the educational app proposes.
This kind of deck library will use a static url to get possible decks that we think are worth your time or have a sponsor and are not contrary to public morality.
To make this possible we think about adding a community based process to decide whether decks are ok to be added and featured in official collections once we have a space for third party decks and are opening it to the public.
Before opening it to the public we will also add a moral guide to decks and what (not) to implement in decks.
This is a very important topic to use, because we do not want to censor any creativity, friendly interaction or limit the freedom of speech, but have to plan for potential abuse of the system as a whole.

Featured decks may also include some sort of charts/trends system to shine light on upcoming decks with a lot of potential and decks that are performing really well over the course of time.
This is to show users that every deck can be interesting and not every deck has to be about the same topic.
We think this may animate users to create own decks and share them with the world and contribute to our goal: *sharing knowledge*.

In the end we might offer others the possibility to sell decks to users for a small fee so that we can get a commission every time someone buys a deck.
This would also help to generate income without the need to maintain a large pool of staff members.
If we give users the opportunity to earn money with our app, they will do their part to make the app successful and boost their and thus our profits.

We think users should be able to see which decks were curated (aka. staff picked, because we like it), featured (aka. loved by our community and used a lot of times) or sponsored by companies or people.
That is why we will introduce different ways to highlight each special deck version to avoid user confusion from the first introduction onward.
Users should not have the feeling they are catered only what they like in order to maximize the time (and money) they spent on our app.
Our goal is to broaden the view of users and let them try out new stuff about new topics even though they might not like a deck we suggest, simply because we as the creators like to learn new and exiting things even if they are foreign to the subjects we spent time with.

Because of the wide range of use cases a deck library will be one of the first things we want to add in the future, but will probably not feature any monetization by then.

### Arrange contact to private tutors

We also thought about some model similar to ads but more focused on the subject of learning.
Users could give their consent to see suitable private tutors for certain subjects they are struggling with.
We could then get a small commision for connecting students with a tutor.
This can also be used together with our educational app approach where older students could offer help for younger ones.
This would also have the advantage that subjects are specific for one institution/school.

### Closing words on monetization

The app will always be open source and free for everyone to fork and create an own version improving what we created.
Because of this we encourage everyone to contribute to this repository in order to create the best application possible.

Ads keep getting more intrusive and are used to get a perfect digital copy of you to target you with even more specialized ads.
We believe apps should not see users as the product they are trying to sell to customers (e.g. advertisers) and that is why we do not want to incorporate any sort of ads in our design.
With our design the focus is shifted to the users anonymity and safety.
They should feel free to learn new or improve their skills.
The constant fear of collecting personalized data and the misuse of it will hinder their learning ability and thus be contraproductive for our purpose.

In general we want to provide our app for free so that anyone can use it.
Additionally we want to let others offer additional services and get commisions on their returns.

## Testing

### Static tests

Testing is one of the most important parts of software created for users.
This is why we opted to use [TypeScript](https://www.typescriptlang.org/) as it helps us in development to avoid simple mistakes like using a wrong type.
[TypeScript](https://www.typescriptlang.org/) ultimately helps in development because errors are mostly caught inside the editor or while compiling instead of failing at runtime.

### Dynamic tests & Manual tests

Because of our small team we decided against unit tests and for manual (exploratory) testing.
Not only because it is easier to manage, but we also wanted to get a feeling of the usability and how to interact with the sofware.
We even iterated on some aspects of the usability features like the way to open our menu &rarr; we decided to add a swipe animation for easier one hand use of the software.

In general every aspect of the app is tested manually by both developers, because of the limited development time and our focus on users.
We plan on introducing different tests in the future with one of them being unit tests of each important modules, like our _specialized_ algorithm to select the next card to learn.
We also want to have a look into tour testing as an extension to our current exploraty testing in the future.

## Backlog

### Some ideas
Ideas we want to implement in the future, but did not have enough time to implement or work out completely.

- update decks and keep learning progress
- extend format and displaying in app to show not only simple text
  - Markdown support
  - formulas similar to LaTeX
  - image support
  - suggested answers to choose from (quiz-like, see below)
- deck library, recommended decks
- optimize random card selection algorithm + make it customizable in app settings
- import decks from a website even if no CORS headers are sent, see [no-cors.md](no-cors.md)
- analytics for insights into individial learning progress
- internationalization
- light color mode
- see also [monetization.md](monetization.md)
- sync learning progress across multiple devices
- gamification
- charts/trends
- help users get started: usage docs, videos, GitHub Learning Lab, ...
- Chatbot (Telegram)
- publishing the application on the Google Play Store or the Apple App Store

### _FFQuiz_ - Fancy FlashQuiz

The following idea will be its own project, but we still want you to know what it's about.
The _FFQuiz_ is a quiz game using the foundation of FFC focused on the gamification of learning.
With FFQuiz we want to expand the use cases for FFC and make learning more enjoyable and accessible for younger and older generations.
The Quiz should be easy to set up and work for 2 or more players.

The game will consist of different rounds and quiz styles.
Players will be competing against one another in some kind of game show you tend to see on TV.
Depending on the number of players you will face of against one or more of your friends.
To help encourage you to use the app each player will get a score and the one with the most knowledge will be ranked first.

We can also spin this idea further in building an ecosystem of apps that all aim to help learning.
For example we could add a _FFHelp_ app which allowes users to communicate across the globe and share their knowledge or some sort of _Wiki_ for schools or universities in certain districts to help them educate students.
The possibilities to improve and expand these ideas is sheer endless.
