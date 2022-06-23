# Speed Typing Game

A speed typing game built with React.

## Tech

- React 18
- Vite: build tool
- Vitest & React Testing Library: unit testing

## Description

A speed typing game that calculates the typing speed in Words per Minute (WPM). For each test, 60 random words are generated from a JSON file with a large array of words. The game starts automatically when the user starts typing. The user has 60 seconds to type
as many words as possible. After 60 seconds the time runs out and the test is done. The score in WPM is calculated and all the incorrect words are highlighted in red. All words that are not typed are considered incorrect.
The user can start a new game by pressing Reset.

This is the first project I made with Test Driven Development in mind (TDD), so first I wrote tests and then I wrote the functional code to make the tests pass and 
to deliver a working end product.

The tests include basic unit tests to check if the elements are rendered correctly, but also more complicated tests that check if random words are generated for each test. 
Lastly, there are tests to test the countdown functionality and the enabling/disabling of the elements (reset button, textarea input) when we start a test or when the test ends.
I used fakeTimers for this.

## Project screen shots

![image](https://user-images.githubusercontent.com/76665118/175319418-a7748bdd-d47b-444c-9361-77687f21e637.png)

Test done with errors highlighted and score calculated:

![image](https://user-images.githubusercontent.com/76665118/175321052-c553f206-70d9-4ab8-9e39-496323ebce5c.png)

## Installation

You will need node and npm installed on your machine.

Install all required modules:

npm install

To start server:

npm start

To visit website:

localhost:3000
