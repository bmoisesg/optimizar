class Generator {
    constructor() {
        this.contador = 0;
        this.listaIgnorar = [];
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
    static getInstance() {
        return this.generator || (this.generator = new this());
    }
    add(code) {
        this.code_optimo += code + "\n";
    }
    add_optimizacion(data) {
        this.reporte += "<tr>\n";
        this.reporte += "<td>mirilla</td>\n";
        for (const x of data) {
            this.reporte += "<td>" + x + "</td>\n";
        }
        this.reporte += "</tr>\n";
    }
}
