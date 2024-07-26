class CSVView {
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

        const [headers, ...rows] = data;

        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const thElement = document.createElement('th');
            thElement.textContent = header;
            headerRow.appendChild(thElement);
        });
        this.table.appendChild(headerRow);

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
        while (this.table.lastElementChild !== null) {
            this.table.removeChild(this.table.lastElementChild);
        }
    }
}
export { CSVView };