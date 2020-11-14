class goto extends Instruction {
    constructor(id, linea) {
        super(linea);
        this.id = id;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        this.s.listaIgnorar = [];
        //console.log("->",this.id)
        //console.log(this.s.listaInstrucciones[this.s.contador - 2] )
        if (this.s.listaInstrucciones[this.s.contador - 2] instanceof condicion) {
            let tmp = this.s.listaInstrucciones[this.s.contador - 2];
            if (tmp.simbolo == "==" && tmp.op1 == tmp.op2) {
                this.s.add_optimizacion(["3",
                    "goto " + this.id + ";",
                    "",
                    this.linea]);
                return;
            }
        }
        let contador = 0;
        let flag = 0;
        //console.log("estoy en :",this.s.contador+1)
        for (let i = this.s.contador; i < this.s.listaInstrucciones.length; i++) {
            const element = this.s.listaInstrucciones[i];
            if (element instanceof etiqueta) {
                if (element.id == this.id) {
                    flag = 1;
                    break;
                }
                else {
                    break;
                }
            }
            contador++;
        }
        if (flag == 1) {
            for (let i = 0; i < contador; i++) {
                this.s.listaIgnorar.push(this.s.contador + i);
            }
            //console.log(this.s.listaIgnorar)
            this.s.add_optimizacion([
                "1",
                "instrucciones",
                "",
                this.linea
            ]);
            //console.log(this.s.listaIgnorar)
            //console.log("tengo que saltarme: "+contador);
        }
        this.s.add("goto " + this.id + ";");
    }
}
