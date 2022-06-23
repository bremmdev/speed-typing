export const calculateWordsPerMinute = (testWords, typedText, time_limit) => {
  const incorrectsArr = []
  let numberOfCorrectWords = 0
  const typedTextArray = typedText.split(' ')
 
  //create an array with the indexes of the incorrectly typed words
  for(let i = 0; i<testWords.length; i++){
    if(!typedTextArray[i] || testWords[i] !== typedTextArray[i]){
      incorrectsArr.push(i)
    }

    //count the number of correct words
    else {
      numberOfCorrectWords++
    }
  }

  const wpm = numberOfCorrectWords * (60 / time_limit)

  return { incorrectsArr, wpm }
}