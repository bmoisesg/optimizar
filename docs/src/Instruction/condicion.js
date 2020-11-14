class condicion extends Instruction {
    constructor(op1, simbolo, op2, etiqueta, l) {
        super(l);
        this.op1 = op1;
        this.simbolo = simbolo;
        this.op2 = op2;
        this.etiqueta = etiqueta;
    }
    execute() {
        let s = Generator.getInstance();
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        if (this.op1 == this.op2 && this.simbolo == "==" &&
            s.listaInstrucciones[s.contador] instanceof goto &&
            s.listaInstrucciones[s.contador + 1] instanceof etiqueta &&
            s.listaInstrucciones[s.contador + 1].id == this.etiqueta) {
            //console.log("---")
            this.s.add_optimizacion([
                "2",
                "if( " + this.op1 + this.simbolo + this.op2 + ") goto " + this.etiqueta + "; " +
                    "goto " + s.listaInstrucciones[s.contador].id + ";" +
                    s.listaInstrucciones[s.contador + 1].id + ";",
                "if( " + this.op1 + "!=" + this.op2 + ") goto " + s.listaInstrucciones[s.contador].id + ";",
                this.linea
            ]);
            this.s.add("if( " + this.op1 + "!=" + this.op2 + ") goto " + s.listaInstrucciones[s.contador].id + ";");
            this.s.listaIgnorar.push(s.contador + 2);
            this.s.listaIgnorar.push(s.contador + 1);
            //console.log(this.s.listaIgnorar)
            return;
        }
        else if (this.op1 == this.op2 && this.simbolo == "!=" &&
            s.listaInstrucciones[s.contador] instanceof goto) {
            //console.log("encontre una regla 4")
            s.add_optimizacion(["4",
                "if( " + this.op1 + " != " + this.op2 + ") goto " + this.etiqueta + ";",
                "",
                this.linea]);
            return;
        }
        else {
            this.s.add("if( " + this.op1 + this.simbolo + this.op2 + ") goto " + this.etiqueta + ";");
        }
    }
}
