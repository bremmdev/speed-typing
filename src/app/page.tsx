import React from "react";
import TypeTest from "./components/TypeTest";
import { generateRandomWords } from "./utils/words";
import { redis } from "./lib/redis";
import LanguageToggle from "./components/LanguageToggle";
import { Language } from "./types/types";
import { TOTAL_WORDS } from "./utils/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const langParam = searchParams.lang as string;
  const lang = (
    langParam && ["en", "nl"].includes(langParam) ? langParam : "en"
  ) as Language;

  let randomWords: Array<string> = [];

  const wordKey = `words-${lang}`;
  try {
    const wordsFromServer = ((await redis.get(wordKey)) || []) as Array<string>;
    randomWords = generateRandomWords(wordsFromServer, TOTAL_WORDS);
  } catch (error) {
    throw new Error("Fetching words from server failed.");
  }

  return (
    <>
      <LanguageToggle language={lang} />
      <h1 className="mt-4 sm:mt-8 text-2xl text-violet-600 lg:text-3xl">
        Speed Typing Game
      </h1>
      <p className="mx-auto max-w-4xl text-xs sm:text-base">
        Type as many words as you can in 60 seconds. Timer starts automatically
        when you start typing. After 60 seconds the game is over and your score
        in Words per Minute (WPM) is calculated.
      </p>
      <TypeTest words={randomWords} key={lang} />
    </>
  );
}
