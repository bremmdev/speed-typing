"use client";

import React from "react";

type Props = {
  words: Array<string>;
  typedText: string;
  correctWordIndexes: Array<number>;
  isTestDone: boolean;
};

const TestWords = ({
  words,
  typedText,
  correctWordIndexes,
  isTestDone,
}: Props) => {
  //empty string is 1 word
  const wordCount = typedText.split(" ").filter(word => word.length > 0).length - 1;

  //highlight the word that is current and highlight incorrect words when test is done
  const wordsWithHighlight = words.map((word, idx) => {
    if (isTestDone && !correctWordIndexes.includes(idx)) {
      return (
        <span key={word} className="text-red-600 font-medium">
          {word}{" "}
        </span>
      );
    }
    if (!isTestDone && typedText !== "" && idx === wordCount) {
      return (
        <span key={word} className="font-bold">
          {word}{" "}
        </span>
      );
    }
    return <span key={word}>{word} </span>;
  });

  return (
    <>
      <div className="font-mono bg-violet-200 select-none p-4 rounded-xl text-center sm:p-6 md:p-8 text-xs sm:text-base">
        {wordsWithHighlight}
      </div>
    </>
  );
};

export default TestWords;
