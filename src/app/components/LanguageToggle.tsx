"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Language } from "../types/types";

type Props = {
  language: Language;
};

const LanguageToggle = ({ language }: Props) => {
  const router = useRouter();

  const handleClick = (lang: Language) => {
    router.push(`/?lang=${lang}`);
  };

  return (
    <div
      className="flex gap-2 md:gap-3 absolute top-4 right-4 md:top-8 md:right-8 px-3 py-2 rounded-full bg-violet-200"
    >
      <Image
        src="/english.svg"
        width={32}
        height={32}
        className={`transition-all duration-300 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-105 hover:brightness-105 ${
          language === "en" ? "opacity-100" : "opacity-50"
        }`}
        alt="english flag"
        onClick={() => handleClick("en")}
      />
      <Image
        src="/dutch.svg"
        width={32}
        height={32}
        className={`transition-all duration-300 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-105 hover:brightness-105 ${
          language === "nl" ? "opacity-100" : "opacity-50"
        }`}
        alt="dutch flag"
        onClick={() => handleClick("nl")}
      />
    </div>
  );
};

export default LanguageToggle;
