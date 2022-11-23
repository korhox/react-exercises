import { Issue } from "./issue";

export class Board {
    public readonly id: BigInteger;
    public readonly name: string;
    public readonly issues: Issue[] = [];

    constructor(id: BigInteger, name: string) {
        this.id = id;
        this.name = name;
    }
}
