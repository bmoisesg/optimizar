import { Instruction } from "../Abstract/Instruction";

export class imprimir extends Instruction {
    constructor(
        public data: string,
        l: number) {
        super(l)
    }
    public execute(){
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
        this.s.add(this.data);
    }
}