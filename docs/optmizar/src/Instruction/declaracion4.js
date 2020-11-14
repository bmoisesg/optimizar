 class declaracion4 extends Instruction {
    constructor(id1, linea) {
        super(linea);
        this.id1 = id1;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.add(this.id1 + ";");
    }
}
