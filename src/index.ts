import { Generator } from "./Tools/Generator";

const parser = require('./Grammar/Optmizar');
const fs = require('fs');

try {

    try {

        const entrada = fs.readFileSync('./src/entrada.txt');
        const ast = parser.parse(entrada.toString());
        
        let s= Generator.getInstance()
        s.contador=1;
        s.listaInstrucciones= ast
        for (let x = 0; x < s.listaInstrucciones.length; x++) {
            let instr = ast[x]
            try {
                instr.execute();
            } catch (error) {
                parser.Lista_errores.push(error.message);
            }
            s.contador++;
        }
        console.log(parser.Lista_errores);
        
        fs.writeFile('./reporte.html',"<table border=1>"+ s.reporte+"</table>", () => { });
        fs.writeFile('./optimo.txt', s.code_optimo, () => { });

    } catch (error) {
        console.log("ocurrio un error al dar parser")
        console.log(error);
    }

}
catch (error) {
    console.log(error);
}
