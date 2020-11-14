class etiqueta extends Instruction {
    constructor(id, linea) {
        super(linea);
        this.id = id;
    }
    execute() {
        //console.log(this.s.contador)
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.add(this.id + ":");
    }
}
