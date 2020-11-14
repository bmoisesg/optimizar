import { runInThisContext } from "vm";
import { Instruction } from "../Abstract/Instruction";


export class declaracion4 extends Instruction {


    constructor(
        public id1: string,
        public linea: number
    ) {
        super(linea);
    }

    public execute() {
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
       this.s.add(this.id1+";");
    }
}