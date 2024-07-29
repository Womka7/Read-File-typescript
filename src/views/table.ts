class CreateTable {
    private table: HTMLElement;

    constructor(tableId: string) {
        const tableElement = document.getElementById(tableId);
        if (tableElement === null) {
            throw new Error(`Element with id ${tableId} not found`);
        }
        this.table = tableElement;
    }

    renderTable(headers: string[], rows: string[][]): void {
        this.clearTable();
        if (headers.length > 0) {
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const thElement = document.createElement('th');
                thElement.textContent = header;
                headerRow.appendChild(thElement);
            });
            this.table.appendChild(headerRow);
        }
        if (rows.length > 0) {
            rows.forEach(row => {
                const rowElement = document.createElement('tr');
                row.forEach(cell => {
                    const columnElement = document.createElement('td');
                    columnElement.textContent = cell;
                    rowElement.appendChild(columnElement);
                });
                this.table.appendChild(rowElement);
            });
        }
    }

    private clearTable(): void {
        this.table.innerHTML = '';
    }
}

export { CreateTable };
