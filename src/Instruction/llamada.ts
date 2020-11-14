import { Instruction } from "../Abstract/Instruction";

export class llamada extends Instruction {
    constructor(
        public id: string,
        public linea: number) {
        super(linea);
    }
    public execute(){
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
        this.s.add(this.id+"();")
    }
}