class declaracion extends Instruction {
    constructor(op1, op2, signo, op3, condicion, linea) {
        super(linea);
        this.op1 = op1;
        this.op2 = op2;
        this.signo = signo;
        this.op3 = op3;
        this.condicion = condicion;
        this.linea = linea;
    }
    execute() {
        if (this.s.listaIgnorar.indexOf(this.s.contador) != -1)
            return;
        if (this.condicion) {
            if (this.op2 == "0" && this.signo == "/") {
                this.s.add_optimizacion(["16",
                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=0;",
                    this.linea]);
                this.s.add(this.op1 + "=0;");
                return;
            }
            if (this.op1 == this.op3 && this.op2 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["6", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op1 == this.op3 && this.op2 == "0" && this.signo == "-") {
                this.s.add_optimizacion(["7", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op1 == this.op3 && this.op2 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["8", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op2 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["10", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op3 + ";", this.linea]);
                this.s.add(this.op1 + "=" + this.op3 + ";");
            }
            else if (this.op2 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["12", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op3 + ";", this.linea]);
                this.s.add(this.op1 + "=" + this.op3 + ";");
            }
            else if (this.op2 == "2" && this.signo == "*") {
                this.s.add_optimizacion(["14",
                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=" + this.op3 + "+" + this.op3 + ";",
                    this.linea]);
                this.s.add(this.op1 + "=" + this.op3 + "+" + this.op3 + ";");
            }
            else if (this.op2 == "0" && this.signo == "*") {
                this.s.add_optimizacion(["15",
                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=0;",
                    this.linea]);
                this.s.add(this.op1 + "=0;");
            }
            else {
                //se queda normal
                this.s.add(this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";");
            }
        }
        else {
            if (this.op1 == this.op2 && this.op3 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["6", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op1 == this.op2 && this.op3 == "0" && this.signo == "-") {
                this.s.add_optimizacion(["7", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op1 == this.op2 && this.op3 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["8", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op1 == this.op2 && this.op3 == "1" && this.signo == "/") {
                this.s.add_optimizacion(["9", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea]);
            }
            else if (this.op3 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["10", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea]);
                this.s.add(this.op1 + "=" + this.op2 + ";");
            }
            else if (this.op3 == "0" && this.signo == "-") {
                this.s.add_optimizacion(["11", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea]);
                this.s.add(this.op1 + "=" + this.op2 + ";");
            }
            else if (this.op3 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["12", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea]);
                this.s.add(this.op1 + "=" + this.op2 + ";");
            }
            else if (this.op3 == "1" && this.signo == "/") {
                this.s.add_optimizacion(["13", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea]);
                this.s.add(this.op1 + "=" + this.op2 + ";");
            }
            else if (this.op3 == "2" && this.signo == "*") {
                this.s.add_optimizacion(["14",
                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=" + this.op2 + "+" + this.op2 + ";",
                    this.linea]);
                this.s.add(this.op1 + "=" + this.op2 + "+" + this.op2 + ";");
            }
            else if (this.op3 == "0" && this.signo == "*") {
                this.s.add_optimizacion(["15",
                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=0;",
                    this.linea]);
                this.s.add(this.op1 + "=0;");
            }
            else {
                //se queda normal
                this.s.add(this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";");
            }
        }
    }
}
