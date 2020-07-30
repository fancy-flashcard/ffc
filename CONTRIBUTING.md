# Contributing to Fancy Flashcard <!-- omit in toc -->

- [I want to create decks and make them available so that everyone can learn and benefit from it](#i-want-to-create-decks-and-make-them-available-so-that-everyone-can-learn-and-benefit-from-it)
- [I'm a developer and want to implement features and fix bugs](#im-a-developer-and-want-to-implement-features-and-fix-bugs)
- [I have feedback, have an idea, found a bug, ...](#i-have-feedback-have-an-idea-found-a-bug-)
- [I want to translate Fancy Flashcard](#i-want-to-translate-fancy-flashcard)

## I want to create decks and make them available so that everyone can learn and benefit from it

A convenient way to create decks is still in progress but we offer a CLI if you are experienced with the command line.
After creating a deck you have several options, most of them requiring some technical expertise currently.
You can share it with your friends via messenger, email, ... and use "Import JSON File" to import your deck saved as a local file.

You can also upload it to a webserver and import the deck via URL.
Then you can share this URL with everyone you want to have acces to and they can import it easily without exchanging files manually.
But keep in mind that such decks are publicly available and can be used by anyone.
At least you can obscure the URL and configure your webserver to accordingly so that it's hard to find for people that shouldn't know of it.

Additionally, if you actually want to share your decks with all Fancy Flashcard users, we offer the possibility to add it as a _Third Party Deck_.
Therefore it needs to be accessible on the web via URL.
Just edit [third-party-decks.json](third-party-decks.json) and open a [pull request](https://github.com/fancy-flashcard/ffc/pulls).

If you need help with any of the steps, feel free to contact us (via [issues](https://github.com/fancy-flashcard/ffc/issues) or email).

## I'm a developer and want to implement features and fix bugs

You may want to checkout our [documentation and ideas](#docs) first.
As we do not cover all technical details there, feel free to contact us (**[@FischerRene](https://github.com/FischerRene)**, **[@nikolockenvitz](https://github.com/nikolockenvitz)**) if something is not clear.
For bug fixes and minor features you can open a [pull request](https://github.com/fancy-flashcard/ffc/pulls).
Before implementing major features we suggest to discuss it with us (via [issues](https://github.com/fancy-flashcard/ffc/issues) or email).

## I have feedback, have an idea, found a bug, ...

We highly appreciate your feedback as it helps to improve Fancy Flashcard.
Currently the easiest way would be to open an [issue](https://github.com/fancy-flashcard/ffc/issues).
Of course you could also contact us (**[@FischerRene](https://github.com/FischerRene)**, **[@nikolockenvitz](https://github.com/nikolockenvitz)**) via email.

If you have an idea or found a bug we suggest the same, just open an [issue](https://github.com/fancy-flashcard/ffc/issues).
Before doing that you can check whether a similar one has been opened before.
Because Fancy Flashcard is relatively small at the moment, it wouldn't matter if you don't check and possibly open a duplicate issue.
But as we hope to grow over time, avoiding duplicates would help us to focus on improving Fancy Flashcard.

## I want to translate Fancy Flashcard

Internationalization is in our [backlog](docs/README.md#backlog) but we didn't started with it yet.
We have the ability to add German but for other languages we need your help.
Just open a pull request or ask us for more information to add a new language.
