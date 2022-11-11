import CharacterBoardComponent from './CharacterBoardComponent';
import './App.css';
import React from 'react';

class App extends React.Component {
  render() {
    return (<>
      <CharacterBoardComponent width={7} height={5} alt={false} />
    </>);
  }
}

export default App;
