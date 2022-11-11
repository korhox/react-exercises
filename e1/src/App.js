import "./App.css";
import React from "react";
import CharacterBoardComponent from "./CharacterBoard";

class App extends React.Component {
  render() {
    return <CharacterBoardComponent width={7} height={5} />;
  }
}

export default App;
