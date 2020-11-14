class metodo2 extends Instruction {
    constructor(linea) {
        super(linea);
        this.linea = linea;
    }
    execute() {
        this.s.add("}");
    }
}
