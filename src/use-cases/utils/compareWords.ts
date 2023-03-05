export const compareWords = (currentWord: string, attemptWord: string) => {
  const currenWordList = currentWord.split('');
  const attemptWordList = attemptWord.split('');

  return attemptWordList.map((letter, index) => {
    let value = 0;
    const findLetter = currenWordList.includes(letter);
    const isSameIndex = currenWordList[index] === letter;
    if (!findLetter) value = 3;
    if (findLetter && !isSameIndex) value = 2;
    if (isSameIndex) value = 1;
    return {
      order: index,
      letter,
      value,
    };
  });
};
