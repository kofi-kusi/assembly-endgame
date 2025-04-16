import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Notice from "./components/Notice";
import { languages } from "./languages";

function App() {
  const [currentWord, setCurrentWord] = useState("react");

  const word = currentWord.split("").map((letter, index) => {
    return <span key={index}>{letter.toUpperCase()}</span>;
  });
  console.log(word);
  const languagesList = languages.map((language) => {
    return (
      <div
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
    .map((key) => <button key={key}>{key.toUpperCase()}</button>);

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
