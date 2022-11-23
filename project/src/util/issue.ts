import { Board } from "./board";

export class Issue {
    public readonly id: BigInteger;
    public readonly content: string;
    public readonly board: Board;

    constructor(id: BigInteger, content: string, board: Board) {
        this.id = id;
        this.content = content;
        this.board = board;
    }
}
