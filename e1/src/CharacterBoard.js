import React from "react";
class CharacterBoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alt: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({ alt: !prevState.alt }));
  };

  createBoard = () => {
    const oddRow = "".padStart(this.props.width, this.state.alt ? "XO" : "OX");
    const evenRow = "".padStart(this.props.width, this.state.alt ? "OX" : "XO");

    let result = "";
    for (let i = 0; i < this.props.height; i++) {
      result +=
        (i % 2 === 0 ? evenRow : oddRow) +
        (i !== this.props.height - 1 ? "\n" : "");
    }

    return result;
  };

  render() {
    return (
      <>
        <div style={{ whiteSpace: "pre" }} id="character-board">
          {this.createBoard()}
        </div>
        <button onClick={this.handleClick}>
          {this.state.alt ? "Oletustilaan" : "Vaihtoehtoiseen tilaan"}
        </button>
      </>
    );
  }
}
export default CharacterBoardComponent;
