import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Notice from "./components/Notice";
import { languages } from "./languages";
import { clsx } from "clsx";
import { getNewWord } from "./utils";
import Confetti from "react-confetti";

function App() {
  const [currentWord, setCurrentWord] = useState(getNewWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessedCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const languageObj = languages[wrongGuessedCount - 1];

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessedCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessedIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  console.log(isLastGuessedIncorrect);

  function addGuessedLetter(key) {
    setGuessedLetters((prev) => {
      return prev.includes(key) ? prev : [...prev, key];
    });
  }

  const word = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const revealWord = isGameLost || isGuessed;

    const className = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span className={className} key={index}>
        {revealWord && letter.toUpperCase()}
      </span>
    );
  });

  const languagesList = languages.map((language, index) => {
    const isOut = index < wrongGuessedCount;
    return (
      <span
        className={isOut ? "lost" : ""}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keys = alphabet.split("").map((key) => {
    const isGuessed = guessedLetters.includes(key);
    const isCorrect = isGuessed && currentWord.includes(key);
    const isWrong = isGuessed && !currentWord.includes(key);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={key}
        onClick={() => addGuessedLetter(key)}
        disabled={isGameOver && true}
      >
        {key.toUpperCase()}
      </button>
    );
  });

  function newGame() {
    setGuessedLetters([]);
    setCurrentWord(getNewWord());
  }

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <section className="top">
        <Header />
        <Notice
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          isGameOver={isGameOver}
          isLastGuessedIncorrect={isLastGuessedIncorrect}
          language={languageObj}
        />
      </section>
      <section className="elimination">
        <div className="languages-container">{languagesList}</div>
      </section>
      <section className="choosen-word">{word}</section>
      <section className="keyboard">{keys}</section>
      <section className="new-game">
        {isGameOver && <button onClick={newGame}>New Game</button>}
      </section>
    </>
  );
}

export default App;
