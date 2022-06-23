import words from "../../words.json"

export const WORD_COUNT = 60;

export const chooseRandomWords = () => {
  const randomWords = [];

  for (let i = 0; i < WORD_COUNT; i++) {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    while (randomWords.includes(randomWord)) {
      randomWord = words[Math.floor(Math.random() * words.length)];
    }
    randomWords.push(randomWord);
  }
  return randomWords;
};
