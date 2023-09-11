# Odin - Battleship

This project was provided by [Odin](https://theodinproject.com) to reinforce TDD material.

#### Challenges I've met:
1. To make `jest` accept ESM syntax, you have to add a `babel.config`
2. [Code specific](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) rabbit hole: functionally `await f(y)` and `f(await y)` are same.
    - In both cases the f function's internals are waiting for a resolution before a return.
3. Testing a private function is a bad idea for encapsulation.
    - One way to solve this issue is to "Implicitly" test them with public methods
    - If such a function has effects (which it likely does), we can test the said object for changes.
4. Defining a function's/project's behavior before it's implementation.
    - The most helpful solution to me was to graphically visualize the relations between the different functions.
    - This way I can get a good grasp of how all the gears of a project move, before writing a singe line.
5. Code regression if I forget to test before a push
    - Add a github action that runs tests on each commit, work only on branches.
    - Setup a git pre-commit hook that runs the test command before each commit.
6. Code becomes a mess when one part of the app wants to be up to date about another
    - In our decoupled approach, it is hard to have a clean and pure ui or Game.js.
    - The solution I found to this issue is implementing the Pub/Sub Pattern