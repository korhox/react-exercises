import React from "react";
class CharacterBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alt: false,
            width: props.width,
            height: props.height,
            buttonText: "Set first to O"
        }
    }

    handleClick = () => {
        if (this.state.alt === true) {
            this.setState({ alt: false, buttonText: "Set first to O" });
        } else {
            this.setState({ alt: true, buttonText: "Set first to X" });
        }
    }

    makeBoard = () => {
        let result = [];
        let mark1 = "X";
        let mark2 = "O";

        if (this.state.alt === true) {
            mark1 = "O";
            mark2 = "X";
        }

        for (let i = 0; i < this.state.height; i++) {
            let row = [];
            for (let j = 0; j < this.state.width; j++) {
                if (i % 2 === 0 && j === 0) {
                    row.push(mark1)
                } else {
                    row[row.length - 1] === mark2 ? row.push(mark1) : row.push(mark2)
                }
            }
            row.push(<br key={i.toString()} />)
            result.push(row);
        }

        return result;

    }
    render() {
        return (<>
            <div id="character-board">{this.makeBoard()}</div>
            <br />
            <button onClick={() => this.handleClick()}>{this.state.buttonText}</button>
        </>);
    }
}
export default CharacterBoardComponent;