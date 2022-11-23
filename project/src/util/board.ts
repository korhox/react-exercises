import { Issue } from "./issue";
import { v4 as uuidv4 } from "uuid";

export class Board {
    private readonly _id: string;
    private _name: string;
    private _issues: Issue[] = [];

    constructor(name: string) {
        this._id = uuidv4();
        this._name = name;
    }

    public get id(): string {
        return this._id;
    }

    public get issues(): Issue[] {
        return this._issues;
    }

    public set issues(value: Issue[]) {
        this._issues = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}
