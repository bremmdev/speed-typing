import React from "react";

const TestWord = ({ word, isCurrent, isIncorrect }) => {
  const testWordClasses = isCurrent
    ? "test-word current"
    : isIncorrect
    ? "test-word incorrect"
    : "test-word";

  return <span className={testWordClasses}>{word + " "}</span>;
};

export default TestWord;
