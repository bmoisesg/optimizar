 class declaracion1 extends Instruction {
    constructor(id, numero, linea) {
        super(linea);
        this.id = id;
        this.numero = numero;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.add(this.id + "=" + this.numero + ";");
    }
}
