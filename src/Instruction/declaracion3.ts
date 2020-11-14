import { Instruction } from "../Abstract/Instruction";


export class declaracion3 extends Instruction {


    constructor(
        public id: string,
        public id2: string,
        public linea: number
    ) {
        super(linea);
    }

    public execute() {
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
        this.s.add(this.id+"="+this.id2+";")
    }
}