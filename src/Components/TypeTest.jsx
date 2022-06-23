import React, { useState, useMemo, useRef, useEffect } from "react";
import TestStats from "./TestStats.jsx";
import TestWord from "./TestWord.jsx";
import { chooseRandomWords, WORD_COUNT } from '../utils/chooseRandomWords.js'
import { calculateWordsPerMinute } from "../utils/calculateWordsPerMinute.js";

const TIME_LIMIT = 60;

const TypeTest = () => {
  const [testVersion, setTestVersion] = useState(0); //state for resetting the test
  const [typedText, setTypedText] = useState("");
  const [testIsRunning, setTestIsRunning] = useState(false);
  const [timeRemaining, setTimeIsRemaining] = useState(TIME_LIMIT);
  const [wordsPerMinute, setWordsPerMinute] = useState(0)
  const [incorrectWords, setIncorrectWords] = useState([])
  const inputRef = useRef(null);

  //memoize testwords, only fetch new test words when starting a new test
  const testWords = useMemo(() => chooseRandomWords(), [testVersion]);

  //create an array from the typed text and count the individual words to track the current word
  let currentWordIdx = typedText ? typedText.trim().split(" ").filter((word) => word !== "").length : 0
  
  //prevent overflow for when user types after keeps typing all words
  if(currentWordIdx > WORD_COUNT){
    currentWordIdx = WORD_COUNT
  }
  
  const handleReset = () => {
    setTestVersion((prevState) => prevState + 1);
    setTypedText("");
    setTimeIsRemaining(TIME_LIMIT);
    setIncorrectWords([])
    setWordsPerMinute(0)
  };

  const handleChange = (e) => {
    //detect starting of test
    if (!testIsRunning) {
      setTestIsRunning(true);
    }
    setTypedText(e.target.value);
  };

  //focus textarea on mount and on every reset
  useEffect(() => {
    inputRef.current.focus();
  }, [testVersion]);

  //countdown
  useEffect(() => {
    let intervalId;
    //start countdown if we start the test
    if (testIsRunning && timeRemaining > 0) {
      intervalId = setTimeout(() => {
        setTimeIsRemaining((prevState) => prevState - 1);
      }, 1000);
    }

    //time's up, test is done
    if (testIsRunning && timeRemaining === 0) {
      setTestIsRunning(false);
      const { incorrectsArr, wpm }  = calculateWordsPerMinute(testWords, typedText, TIME_LIMIT)
      setIncorrectWords(incorrectsArr)
      setWordsPerMinute(wpm)
    }

    return () => clearInterval(intervalId);
  }, [testIsRunning, timeRemaining]);

  //list of test words, check for each one if is 'current' or 'incorrect'
  const testWordsList = testWords.map((word, idx) => {
    if(incorrectWords.includes(idx)) {
      return (
        <TestWord key={idx} word={word} isCurrent={false} isIncorrect={true} />
      );
    }
    if (idx === currentWordIdx - 1) {
      return (
        <TestWord key={idx} word={word} isCurrent={true} isIncorrect={false} />
      );
    }
    return <TestWord key={idx} word={word} isCurrent={false} isIncorrect={false} />;
  });

  return (
    <main>
      <section className="test-words" data-testid="test-words">
       {testWordsList}
      </section>

      <section className="type-input">
        <textarea
          className="type-input-field"
          ref={inputRef}
          value={typedText}
          onChange={handleChange}
          placeholder="Start typing the words to begin the test..."
          rows="6"
          disabled={!testIsRunning && timeRemaining === 0}
        ></textarea>
        <button
          className="reset-btn"
          disabled={testIsRunning}
          onClick={handleReset}
        >
          Reset
        </button>
      </section>

      <TestStats timeRemaining={timeRemaining} wordsPerMinute={wordsPerMinute} />
    </main>
  );
};

export default TypeTest;
