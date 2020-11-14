class llamada extends Instruction {
    constructor(id, linea) {
        super(linea);
        this.id = id;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.add(this.id + "();");
    }
}
