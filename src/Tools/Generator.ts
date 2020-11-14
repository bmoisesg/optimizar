import { etiqueta } from "../Instruction/etiqueta";

export class Generator {
    private static generator: Generator;
    public code_optimo: string;
    public reporte: string;
    public contador: number=0
    public listaInstrucciones: any;
    public listaIgnorar: Array<number>=[];

    private constructor() {
        this.code_optimo = "";
        this.reporte = `
        <tr>
        <th>tipo</th>
        <th>regla</th>
        <th>codigo eliminado</th>
        <th>codigo agregado</th>
        <th>fila</th>
        </tr>`;
    }

    public static getInstance() {
        return this.generator || (this.generator = new this());
    }

    public add(code:string){
        this.code_optimo+= code+"\n"
    }
    public add_optimizacion(data:any[]){
        this.reporte+="<tr>\n"
        this.reporte+="<td>mirilla</td>\n"
        for (const x of data) {
            this.reporte+="<td>"+x+"</td>\n"
        }
        this.reporte+="</tr>\n"
    }
}