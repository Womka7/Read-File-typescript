class Pagination {
    private container: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id ${containerId} not found.`);
        }
        this.container = container;
    }

    render(currentPage: number, totalItems: number, pageSize: number, onPageChange: (page: number) => void): void {
        this.container.innerHTML = ''; 

        const totalPages = Math.ceil(totalItems / pageSize);

        this.appendButton('|<', currentPage <= 1, () => onPageChange(1));
        this.appendButton('<', currentPage <= 1, () => onPageChange(currentPage - 1));

        this.appendPageRange(currentPage, pageSize, totalItems);

        this.appendButton('>', currentPage >= totalPages, () => onPageChange(currentPage + 1));
        this.appendButton('>|', currentPage >= totalPages, () => onPageChange(totalPages));
    }

    private appendButton(text: string, disabled: boolean, onClick: () => void): void {
        const button = document.createElement('button');
        button.textContent = text;
        button.disabled = disabled;
        button.addEventListener('click', onClick);
        this.container.appendChild(button);
    }

    private appendPageRange(currentPage: number, pageSize: number, totalItems: number): void {
        const startItem = (currentPage - 1) * pageSize + 1;
        const endItem = Math.min(currentPage * pageSize, totalItems);
        const pageRangeDisplay = document.createElement('span');
        pageRangeDisplay.textContent = `${startItem} a ${endItem} de ${totalItems}`;
        this.container.appendChild(pageRangeDisplay);
    }
}
export {Pagination}