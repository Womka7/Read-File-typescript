
class InputSearch {
    private searchInput: HTMLInputElement;
    private timeOut: number| undefined;

    constructor(idDivSearch:string, onSearch:(dataSearch:string)=> void, debounceDelay: number = 300)  {
        const containerInput = document.getElementById(idDivSearch) as HTMLDivElement;
        
        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.placeholder = 'Buscar...';
        this.searchInput.id = 'inputFilter';

        containerInput.appendChild(this.searchInput);

        this.searchInput.addEventListener('input', () => {
            this.debounceSearch(onSearch, debounceDelay);
        });
    }
    
    // Debounce para evitar llamadas innecesarias
    private debounceSearch(onSearch:(dataSearch:string)=>void, delay:number):void {
        clearTimeout(this.timeOut);
        this.timeOut = window.setTimeout(() => {
            onSearch(this.searchInput.value);
        }, delay);  
    }
}
export { InputSearch }