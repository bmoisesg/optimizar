import { Instruction } from "../Abstract/Instruction";

export class metodo1 extends Instruction {
    constructor(
        public id : string,
        public linea: number
    ) {
        super(linea)
    }
    public execute(){
        this.s.add("void "+this.id +"(){")
    }
}
