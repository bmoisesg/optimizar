import { Generator } from "../Tools/Generator";

export abstract class Instruction {
    public linea: number;
    public s= Generator.getInstance()
    constructor(l: number) {
        this.linea = l;
        //this.column = column;
    }

    public abstract execute() : any;
   

}