import { runInThisContext } from "vm";
import { Instruction } from "../Abstract/Instruction";


export class declaracion1 extends Instruction {


    constructor(
        public id: string,
        public numero: string,
        public linea: number
    ) {
        super(linea);
    }

    public execute() {
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
        this.s.add(this.id+"="+this.numero+";")
    }
}