<!-- README inspired by https://github.com/othneildrew/Best-README-Template -->

<p align="center">
  <a href="https://github.com/fancy-flashcard/ffc">
    <img src="src/assets/flash.svg" alt="Fancy Flashcard Logo" width="120" height="120">
  </a>

  <h3 align="center">Fancy Flashcard</h3>

  <p align="center">
    Lightweight free and open-source PWA to help you learning on all your devices
    <br />
    <a href="docs/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://fancy-flashcard.github.io/ffc/">Start Learning</a>
    ·
    <a href="https://github.com/fancy-flashcard/ffc/issues">Report Bug</a>
    ·
    <a href="CONTRIBUTING.md">Contribute</a>
  </p>

  <p align="center">
    <a href="#readme"
    ><img src="https://img.shields.io/badge/dynamic/json?color=informational&label=version&query=%24.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ffancy-flashcard%2Fffc%2Fmaster%2Fpackage.json" alt="Version Number"
    ></a>
    <a href="https://github.com/fancy-flashcard/ffc/actions?query=workflow%3A%22Build+and+Deploy%22"
    ><img src="https://img.shields.io/github/workflow/status/fancy-flashcard/ffc/Build%20and%20Deploy" alt="Build and Deploy status"
    ></a>
    <a href="LICENSE"
    ><img src="https://img.shields.io/badge/license-GNU%20GPLv2-success" alt="GNU GPLv2 License"
    ></a>
  </p>
</p>

## Screenshots

<img src="docs/img/deck-selection.png" alt="Deck Selection" width="24%" /> <img src="docs/img/deck-selection-selected.png" alt="Deck Selection - one deck selected" width="24%" /> <img src="docs/img/q-and-a.png" alt="Card" width="24%" /> <img src="docs/img/finish.png" alt="Evaluation after finishing learning" width="24%" /> <img src="docs/img/menu.png" alt="Menu" width="24%" /> <img src="docs/img/import.png" alt="Import" width="24%" /> <img src="docs/img/third-party-decks.png" alt="Third Party Decks" width="24%" /> <img src="docs/img/add-decks.png" alt="Successfully add a Deck" width="24%" /> 

## Deployment
The app is build and deployed to https://fancy-flashcard.github.io/ffc on every push to master branch (via GitHub Actions and GitHub Pages).

You are also able to deploy this on your own with the help of docker.
To do so you can
1. Use the following docker commands:
   > $ docker build . -t ffc <br>
   > $ docker run --name fancy-flashcard -d -p 8080:80 ffc
2. Use the following docker-compose command:
   > $ docker-compose up -d

Either way the app will be available on port ``8080``.

## Contributing
Feel free to report bugs or ideas via [Issues](issues).
Also we highly appreciate [Pull Requests](pulls).
Check out the [Contributing Guide](CONTRIBUTING.md) and the [docs](docs) to get started and see how to set up `Vue.js` below.

| Action                                   | Command         |
| ---------------------------------------- | --------------- |
| Project setup                            | `npm install`   |
| Compiles and hot-reloads for development | `npm run serve` |
| Compiles and minifies for production     | `npm run build` |
| Lints and fixes files                    | `npm run lint`  |

## License

Distributed under the GPL-2.0 License. See [LICENSE](LICENSE) for more information.
