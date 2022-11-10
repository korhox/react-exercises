function CharacterBoard(props) {
    let result = [];

    for (let i = 0; i < props.height; i++) {
        let row = [];
        for (let j = 0; j < props.width; j++) {
            if (i % 2 === 0 && j === 0) {
                row.push("X")
            } else {
                row[row.length - 1] === "O" ? row.push("X") : row.push("O")
            }
        }
        row.push(<br key={i.toString()} />)
        result.push(row);
    }

    return (
        <div id="character-board">{result}</div>
    );
}
export default CharacterBoard;