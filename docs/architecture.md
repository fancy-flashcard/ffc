# Architecture

Some general ideas regarding our architecture can also be found in the [general docs](README.md).

## Progressive Web App

We decided to create a Progressive Web App instead of a native app because it's easier to develop and maintain.
PWAs radically facilitate onboarding for users and can be accessed from any device (even computers).

By creating a PWA we can easily deploy our app on the web and are not forced to offer it an app store (even though we can still do that with our PWA).

## Decentralized model

To ensure the highest possible level of privacy and data protection we decided for a completely decentralized app without any central server it depends on.
That means all learning progress is stored on users devices so they don't need to fear tracking or espionage.
Anyone can offer decks for download online and additionally decks can also be imported from files.

## Component based

In `Vue.js` the web app is structured into components, each fulfilling a single purpose.
By splitting into small clearly arranged parts, the code is easier to understand and to maintain.
As we use single file components the layout, styling and logic can be found in one file for each component.
One might argue that having HTML, JavaScript and CSS mixed up in one file is contrary to separation of concerns, but we found it very convenient to have all stuff for a certain purpose in one file and not splitted into three.
As highlighted in the [Vue docs](https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns) separation of concerns is not about separation of file types.
`Vue.js` offers to split JavaScript and CSS into distinct files but as mentioned above it helped to see all code belonging together in one file.

Additionally we moved some of the code to helper files, making it possible to reduce size of the components and thus increasing readability.
