// import { AnaliceCSV } from "../models/readModelFile";
import { AnaliceCSV } from "../models/read-model-file";
import { Pagination } from "../views/pagination";
import { InputSearch } from "../views/searchInput";
import { CreateTable } from "../views/table";

class CSVReader {
    private file: File;
    private currentPage: number = 1;
    private pageSize: number = 15;
    private data: AnaliceCSV | null = null;
    private paginationView: Pagination;
    private filteredData: any[] = [];
    private inputSearchView: InputSearch;

    constructor(file: File) {
        this.file = file;
        this.paginationView = new Pagination('pagination-controls');
        this.inputSearchView = new InputSearch('search-container', (dataSearch) => this.searchData(dataSearch));
    }

    readFile(): void {
        const reader = new FileReader();

        reader.onload = (event) => {
            const text = (event.target as FileReader).result as string;
            const rows = text.trim().split('\n');

            const headers = this.readCSVRow(rows[0]);
            const dataRows = rows.slice(1).map(row => this.readCSVRow(row));
            const data: AnaliceCSV = {
                headers,
                data: dataRows.map(row => {
                    const object: any = {};
                    headers.forEach((header, index) => {
                        object[header] = row[index] || '';
                    });
                    return object;
                })
            };
            this.data = data;
            this.filteredData = data.data;
            this.showPage(this.currentPage);
            this.createPaginationControls();
        };

        reader.onerror = (error) => {
            console.error('Hubo un problema leyendo el archivo: ', error);
        };

        reader.readAsText(this.file);
    }

    private readCSVRow(row: string): string[] {
        const result: string[] = [];
        let match;
        const regex = /(?:,|\n|\r|^)(?:\"([^\"]*)\"|([^\",]*))(?=\s*,|\s*|\n|\r|$)/g;
        while ((match = regex.exec(row)) !== null) {
            result.push(match[1] || match[2] || '');
        }
        return result;
    }

    private showPage(page: number): void {
        if (this.data === null) {
            console.error('Data is not loaded yet.');
            return;
        }

        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;
        const paginatedData = this.filteredData.slice(start, end);

        const table = new CreateTable('table');
        table.renderTable(this.data.headers, paginatedData.map(item =>
            this.data!.headers.map(header => item[header])
        ));
    }

    public searchData(dataSearch: string): void {
        if (!this.data) return;

        const filter = dataSearch.toLowerCase();
        this.filteredData = this.data.data.filter((item: any) => {
            return this.data!.headers.some(header => {
                const value = item[header];
                return value && String(value).toLowerCase().includes(filter);
            });
        });

        this.currentPage = 1;
        this.showPage(this.currentPage);
        this.createPaginationControls();
    }

    private createPaginationControls(): void {
        if (!this.data) return;

        const totalItems = this.filteredData.length;
        this.paginationView.render(
            this.currentPage,
            totalItems,
            this.pageSize,
            (page) => this.goToPage(page)
        );
    }

    private goToPage(page: number): void {
        if (this.data && page >= 1 && page <= Math.ceil(this.filteredData.length / this.pageSize)) {
            this.currentPage = page;
            this.showPage(this.currentPage);
            this.createPaginationControls();
        }
    }

    public nextPage(): void {
        if (this.data) {
            const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.showPage(this.currentPage);
                this.createPaginationControls();
            }
        }
    }

    public previousPage(): void {
        if (this.data && this.currentPage > 1) {
            this.currentPage--;
            this.showPage(this.currentPage);
            this.createPaginationControls();
        }
    }
}

export { CSVReader };
