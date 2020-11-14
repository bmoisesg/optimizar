 class declaracion2 extends Instruction {
    constructor(id1, id2, id3, condicon, linea) {
        super(linea);
        this.id1 = id1;
        this.id2 = id2;
        this.id3 = id3;
        this.condicon = condicon;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        if (this.condicon)
            this.s.add(this.id1 + "=" + this.id2 + "[" + this.id3 + "];");
        else
            this.s.add(this.id1 + "[" + this.id2 + "]=" + this.id3 + ";");
    }
}
