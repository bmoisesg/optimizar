class metodo1 extends Instruction {
    constructor(id, linea) {
        super(linea);
        this.id = id;
        this.linea = linea;
    }
    execute() {
        this.s.add("void " + this.id + "(){");
    }
}
