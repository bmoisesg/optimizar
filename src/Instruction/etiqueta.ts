import { Instruction } from "../Abstract/Instruction";

export class etiqueta extends Instruction {
    constructor(
        public id: string,
        linea: number
    ) {
        super(linea)
    }
    public execute(){
        //console.log(this.s.contador)
        if (this.s.listaIgnorar.indexOf(this.s.contador ) != -1) return;

        this.s.add(this.id+":")
    }
}