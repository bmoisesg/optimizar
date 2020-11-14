import { runInThisContext } from "vm";
import { Instruction } from "../Abstract/Instruction";


export class declaracion2 extends Instruction {


    constructor(
        public id1: string,
        public id2: string,
        public id3: string,
        public condicon: boolean,
        public linea: number
    ) {
        super(linea);
    }

    public execute() {
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
        if(this.condicon) this.s.add(this.id1+"="+this.id2+"["+this.id3+"];");
        else this.s.add(this.id1+"["+this.id2+"]="+this.id3+";");
    }
}