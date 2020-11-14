 class imprimir extends Instruction {
    constructor(data, l) {
        super(l);
        this.data = data;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.add(this.data);
    }
}
