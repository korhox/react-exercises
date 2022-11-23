import { Board } from "./board";
import { v4 as uuidv4 } from "uuid";

export class Issue {
    private readonly _id: string;
    private _content: string;
    private _board: Board;

    constructor(content: string, board: Board) {
        this._id = uuidv4();
        this._content = content;
        this._board = board;
    }
    public get id(): string {
        return this._id;
    }
    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
    public get board(): Board {
        return this._board;
    }
    public set board(value: Board) {
        this._board = value;
    }
}
