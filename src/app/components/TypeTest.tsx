"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { checkWords } from "../utils/words";
import TestWords from "./TestWords";
import { TIME_LIMIT } from "../utils/constants";

type Props = {
  words: Array<string>;
};

const TypeTest = ({ words }: Props) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const timeRef = React.useRef<NodeJS.Timeout | undefined>();
  const [timeRemaining, setTimeRemaining] = React.useState(TIME_LIMIT);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [gameVersion, setGameVersion] = React.useState(0);
  const [typedText, setTypedText] = React.useState("");
  const [WPM, setWPM] = React.useState(0);
  const [correctWordIndexes, setCorrectWordIndexes] = React.useState<
    Array<number>
  >([]);

  const router = useRouter();

  const handleTypeTestEnd = React.useCallback(() => {
    clearInterval(timeRef!.current!);
    setIsTimerRunning(false);
    const { correctIndexes, WPM } = checkWords(words, typedText);
    setCorrectWordIndexes(correctIndexes);
    setWPM(WPM);
  }, [words, typedText]);

  const handleReset = () => {
    if (textAreaRef.current) {
      //refocus on textarea
      setGameVersion((prev) => prev + 1);
      setTimeRemaining(TIME_LIMIT);
      setTypedText("");
      setCorrectWordIndexes([]);
      setWPM(0);
    }
    //fetch new words for new test
    router.refresh();
  };

  const handleStartTyping = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timeRef!.current = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
  };

  React.useEffect(() => {
    //check if time is up
    if (timeRemaining === 0) {
      handleTypeTestEnd();
    }
  }, [timeRemaining, handleTypeTestEnd]);

  React.useEffect(() => {
    return () => {
      clearInterval(timeRef!.current!);
    };
  }, []);

  const testIsDone = timeRemaining === 0;

  return (
    <React.Fragment key={gameVersion}>
      <TestWords
        words={words}
        typedText={typedText}
        correctWordIndexes={correctWordIndexes}
        isTestDone={testIsDone}
      />
      <textarea
        autoFocus
        className="outline-none font-mono bg-violet-200 rounded-xl p-4 w-full autofocus resize-none h-40 sm:h-56 md:h-52 sm:p-6 md:p-8 text-xs sm:text-base focus:ring-violet-600 focus:ring-2 disabled:opacity-50"
        placeholder="Start typing the words to begin the test..."
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onInput={handleStartTyping}
        ref={textAreaRef}
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        disabled={testIsDone}
      ></textarea>
      <button
        onClick={handleReset}
        className="transition-all w-fit mx-auto duration-300 text-base sm:text-lg block bg-violet-200 text-violet-600 font-bold py-2 px-8 rounded-lg cursor-pointer ring-violet-600 ring-2 border-b-violet-600 border-b-2 hover:bg-violet-100 hover:scale-105 disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed"
        disabled={isTimerRunning}
      >
        Reset
      </button>
      <div className="flex justify-between mx-auto w-3/4">
        <div className="flex flex-col gap-3">
          <span>Time Remaining:</span>
          <span className="text-center text-2xl sm:text-3xl text-violet-600 font-medium">
            {timeRemaining}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span>Speed (WPM):</span>
          <span className="text-center text-2xl sm:text-3xl text-violet-600 font-medium">
            {WPM}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TypeTest;
