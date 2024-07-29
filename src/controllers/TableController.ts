import { CSVReader } from "./FileReaderCSV";

class TableController {
    private fileInput: HTMLInputElement;
    private searchInput: HTMLInputElement;
    private csvReader: CSVReader | null = null; 

    constructor(fileInputId: string, searchInputId: string) {
        this.fileInput = document.getElementById(fileInputId) as HTMLInputElement;
        this.searchInput = document.getElementById(searchInputId) as HTMLInputElement;
        this.init();
    }

    private init(): void {
        this.fileInput.addEventListener('change', (event) => {
            const fileInput = event.target as HTMLInputElement;
            const file = fileInput.files?.[0];

            if (file && file.type === 'text/csv') {
                this.csvReader = new CSVReader(file);
                this.csvReader.readFile();
            } else {
                alert('Debes seleccionar un archivo .csv');
                fileInput.value = '';
            }
        });

        this.searchInput.addEventListener('input', () => {
            const searchValue = this.searchInput.value;
            if (this.csvReader) {
                this.csvReader.searchData(searchValue);
            }
        });
    }
}

export { TableController };
