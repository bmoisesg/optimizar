import { Instruction } from "../Abstract/Instruction";

export class metodo2 extends Instruction {
    constructor(
        public linea: number
    ) {
        super(linea)
    }
    public execute(){
        this.s.add("}")
    }
}
