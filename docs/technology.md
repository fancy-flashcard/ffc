# Technology

## Why Vue?

`Vue.js` is a community backed and lightweight frontend framework.
Compared to React and Angular it's easier to learn and get started right away.
Apart from the advantage for us, we also see the chance that others can contribute more easily.
All this is of course aided by the ease of use and broadly available documentation of `Vue.js`.

Additionally `Vue.js` offers the possibility to use TypeScript so that we could take advantage of using typing and static code checks.

## Why Vuetify?

Vuetify is a library with many UI components for Material Design.
It's widely used and well documented.
We chose to add it to our project because we wanted our app to comply with [Material Design Guidlines](https://material.io) and it really helped us to create beautiful user interfaces quickly.

## Local Storage for storing data

As we decided for a decentral approach, we somehow needed to store data client-side.
Among all the possibilites we decided for Local Storage because it's very simple and satisfies exactly what we need:
storing key-value-pairs without any overhead.

## Service Worker

To make PWAs feel like native apps, a Service Worker is required.
It offers the possibility to cache data and resources which makes our app work offline.
In the future it may help us by offering access to notifications.

Additionally we make our app installable by providing a manifest, thus users can add it to their homescreen and it feels like a natie app.
