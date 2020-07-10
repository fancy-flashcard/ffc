# Testing

Testing is one of the most important parts of software created for users.
This is why we opted to use TypeScript as it helps us in development to avoid simple mistakes like using a wrong type.
TypeScript ultimately helps in development because errors are mostly caught inside the editor or while compiling instead of failing at runtime.

Because of our small team we decided against unit tests and for manual testing.
Not only because it is easier to manage, but we also wanted to get a feeling of the usability and how to interact with the sofware.
We even iterated on some aspects of the usability features like the way to open our menu &rarr; we decided to add a swipe animation for easier one hand use of the software.

In general every aspect of the app is tested manually by both developers, because of the limited development time and our focus on users.
We plan on introducing different tests in the future with one of them being unit tests of each important modules, like our _specialized_ algorithm to select the next card to learn.
