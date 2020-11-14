 class declaracion3 extends Instruction {
    constructor(id, id2, linea) {
        super(linea);
        this.id = id;
        this.id2 = id2;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.add(this.id + "=" + this.id2 + ";");
    }
}
