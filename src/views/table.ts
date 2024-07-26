class createTable {
    private table: HTMLElement;

    constructor(tableId: string) {
        const tableElement = document.getElementById(tableId);
        if (tableElement === null) {
            throw new Error(`Element with id ${tableId} not found`);
        }
        this.table = tableElement;
    }
    renderTable(data: string[][]) {
        this.clearTable();
        if (data.length === 0) return;
    
        let headers: string[] = [];
        let rows: string[][] = [];
    
        // Usar forEach para dividir los encabezados y las filas
        data.forEach((row, index) => {
            if (index === 0) {
                headers = row; // La primera fila son los encabezados
            } else {
                rows.push(row); // El resto son las filas de datos
            }
        });
    
        // Crear la fila de encabezado
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const thElement = document.createElement('th');
            thElement.textContent = header;
            headerRow.appendChild(thElement);
        });
        this.table.appendChild(headerRow);
    
        // Crear las filas de datos
        rows.forEach(row => {
            const rowElement = document.createElement('tr');
            row.forEach(element => {
                const columnElement = document.createElement('td');
                columnElement.textContent = element;
                rowElement.appendChild(columnElement);
            });
            this.table.appendChild(rowElement);
        });
    }
    
    
    private clearTable() {
        this.table.innerHTML = ""
    }
}
export { createTable };