import { runInThisContext } from "vm";
import { Instruction } from "../Abstract/Instruction";


export class declaracion extends Instruction {


    constructor(
        public op1: string,
        public op2: string,
        public signo: string,
        public op3: string,
        public condicion: boolean,
        public linea: number
    ) {
        super(linea);
    }

    public execute() {
        if(this.s.listaIgnorar.indexOf(this.s.contador)!=-1)return;
        if (this.condicion) {
            if (this.op2 == "0" && this.signo == "/") {
                this.s.add_optimizacion(["16",
                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=0;",
                    this.linea])
                this.s.add(this.op1 + "=0;")
                return
            }

            if (this.op1 == this.op3 && this.op2 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["6", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
            else if (this.op1 == this.op3 && this.op2 == "0" && this.signo == "-") {
                this.s.add_optimizacion(["7", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
            else if (this.op1 == this.op3 && this.op2 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["8", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
           
            else if (this.op2 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["10", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op3 + ";", this.linea])
                this.s.add(this.op1 + "=" + this.op3 + ";")
            }
           
            else if (this.op2 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["12", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op3 + ";", this.linea])
                this.s.add(this.op1 + "=" + this.op3 + ";")
            }
            
            else if (this.op2 == "2" && this.signo == "*") {
                this.s.add_optimizacion(["14",

                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=" + this.op3 + "+" + this.op3 + ";",
                    this.linea])

                this.s.add(this.op1 + "=" + this.op3 + "+" + this.op3 + ";")
            }
            else if (this.op2 == "0" && this.signo == "*") {
                this.s.add_optimizacion(["15",

                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=0;",
                    this.linea])

                this.s.add(this.op1 + "=0;")
            }
            else {
                //se queda normal
                this.s.add(this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";")
            }

        } else {


            if (this.op1 == this.op2 && this.op3 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["6", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
            else if (this.op1 == this.op2 && this.op3 == "0" && this.signo == "-") {
                this.s.add_optimizacion(["7", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
            else if (this.op1 == this.op2 && this.op3 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["8", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
            else if (this.op1 == this.op2 && this.op3 == "1" && this.signo == "/") {
                this.s.add_optimizacion(["9", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", "", this.linea])
            }
            else if (this.op3 == "0" && this.signo == "+") {
                this.s.add_optimizacion(["10", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea])
                this.s.add(this.op1 + "=" + this.op2 + ";")
            }
            else if (this.op3 == "0" && this.signo == "-") {
                this.s.add_optimizacion(["11", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea])
                this.s.add(this.op1 + "=" + this.op2 + ";")
            }
            else if (this.op3 == "1" && this.signo == "*") {
                this.s.add_optimizacion(["12", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea])
                this.s.add(this.op1 + "=" + this.op2 + ";")
            }
            else if (this.op3 == "1" && this.signo == "/") {
                this.s.add_optimizacion(["13", this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";", this.op1 + "=" + this.op2 + ";", this.linea])
                this.s.add(this.op1 + "=" + this.op2 + ";")
            }
            else if (this.op3 == "2" && this.signo == "*") {
                this.s.add_optimizacion(["14",

                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=" + this.op2 + "+" + this.op2 + ";",
                    this.linea])

                this.s.add(this.op1 + "=" + this.op2 + "+" + this.op2 + ";")
            }
            else if (this.op3 == "0" && this.signo == "*") {
                this.s.add_optimizacion(["15",

                    this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";",
                    this.op1 + "=0;",
                    this.linea])

                this.s.add(this.op1 + "=0;")
            }
            else {
                //se queda normal
                this.s.add(this.op1 + "=" + this.op2 + " " + this.signo + " " + this.op3 + ";")
            }
        }

    }

}