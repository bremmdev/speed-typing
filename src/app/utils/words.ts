import { TIME_LIMIT } from "./constants";

export function generateRandomWords(words: Array<string>, length: number) {
  let result: Array<string> = [];
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * words.length);
    while (result.includes(words[randomIndex])) {
      randomIndex = Math.floor(Math.random() * words.length);
    }
    result.push(words[randomIndex]);
  }
  return result;
}

export function checkWords(words: Array<string>, input: string) {
  const typedWords = input.split(" ").filter((word) => word.length > 0);
  const correctIndexes: Array<number> = [];
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === words[i]) {
      correctIndexes.push(i);
    }
  }

  //calculate score
  const WPM = Math.floor(60 / TIME_LIMIT) * correctIndexes.length;

  return { correctIndexes, WPM };
}
