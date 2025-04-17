import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Notice from "./components/Notice";
import { languages } from "./languages";
import { clsx } from "clsx"

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([])

  console.log(guessedLetters)

  function addGuessedLetter(key){
    setGuessedLetters(prev => {
      return prev.includes(key) ? prev : [...prev, key]
    })
  }

  const word = currentWord.split("").map((letter, index) => {
    return <span key={index}>{letter.toUpperCase()}</span>;
  });

  const languagesList = languages.map((language) => {
    return (
      <div
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </div>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keys = alphabet
    .split("")
    .map((key) => {
      const isGuessed = guessedLetters.includes(key);
      const isCorrect = isGuessed && currentWord.includes(key);
      const isWrong = isGuessed && !currentWord.includes(key);
      const className = clsx({
        correct: isCorrect,
        wrong: isWrong
      })

      return (
      <button 
        className={className}
        key={key} 
        onClick={() => addGuessedLetter(key)}>
          {key.toUpperCase()}
      </button>
    )
    });

  return (
    <>
      <section className="top">
        <Header />
        <Notice />
      </section>
      <section className="elimination">
        <div className="languages-container">{languagesList}</div>
      </section>
      <section className="choosen-word">{word}</section>
      <section className="keyboard">{keys}</section>
      <section className="new-game">
        <button>New Game</button>
      </section>
    </>
  );
}

export default App;
