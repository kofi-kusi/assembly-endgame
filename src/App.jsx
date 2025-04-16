import "./App.css";
import Header from "./components/Header";
import Notice from "./components/Notice";
import { languages } from "./languages";

function App() {
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
  return (
    <>
      <Header />
      <Notice />
      <section className="elimination">
        <div className="languages-container">{languagesList}</div>
      </section>
    </>
  );
}

export default App;
