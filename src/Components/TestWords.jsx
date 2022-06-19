import React from 'react'
import words from '../../words.json'
import TestWord from './TestWord.jsx'

const WORD_COUNT = 60

const chooseRandomWords = (words) => {
  const randomWords = []

  for(let i = 0; i<WORD_COUNT; i++){
    let randomWord = words[Math.floor(Math.random() * WORD_COUNT)]
    while(randomWords.includes(randomWord)){
       randomWord = words[Math.floor(Math.random() * WORD_COUNT)]
    }
    randomWords.push(randomWord)
  }
  return randomWords
}

const TestWords = () => {

  const randomWords = chooseRandomWords(words)
  const wordList = randomWords.map((word, idx) => <TestWord key={idx} word={word} isActive={false} isWrong={false} />)
  console.log(randomWords)
  return (
    <section className="test-words" data-testid="test-words">
      {wordList}
    </section>
  )
}

export default TestWords