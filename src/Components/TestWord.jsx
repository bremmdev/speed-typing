import React from "react";

const TestWord = ({ word, isActive, isWrong }) => {
  const testWordClasses = isActive
    ? "test-word active"
    : isWrong
    ? "test-word wrong"
    : "test-word";

  return <span className={testWordClasses}>{word + " "}</span>;
};

export default TestWord;
