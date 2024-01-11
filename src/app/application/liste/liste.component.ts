import { Component } from '@angular/core';
import { Caracter } from 'src/app/models/Caracter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  next!: string;
  previous!: string;
  totalPages!: number;
  currentPage = 1;
  PAGE_SIZE!: number;

  ngOnInit(){
    let storedPage = Number(localStorage.getItem('currentPage'));
    if (isNaN(storedPage) || storedPage < 1 || storedPage > this.totalPages) {
        storedPage = 1;
    }
    this.currentPage = storedPage;
    this.getAllCaracters(this.currentPage);
  }

  caracters_datas:Caracter[]=[]
  constructor(private appService:AppService
  ){
  }
  
  getAllCaracters(page:number){
    this.successMessage = '';
    this.errorMessage='';
    this.loading = true;
    this.appService.getAll(page).subscribe(
      (response:any)=>{
        console.log(response)
        if (response.results.length===0){
          // this.notificationService.showError('Erreur',"")
        }
        this.caracters_datas=response.results
        this.currentPage = page;
        this.PAGE_SIZE=20
        this.totalPages = response.info.pages
        this.next = response.info.next;
        this.previous = response.info.prev;
        localStorage.setItem('currentPage', this.currentPage.toString());
        this.loading = false;
      },
      (error)=>{

      },
      ()=>{
        
      }
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    localStorage.setItem('currentPage', this.currentPage.toString());
    this.getAllCaracters(this.currentPage);
}

  nextPage(): void {
    if (this.next) {
      const nextPage = this.next.split('=')[1]; 
      this.getAllCaracters(Number(nextPage));
    }
  }

  previousPage(): void {
    if (this.previous) {
      const previousPage = this.previous.split('=')[1]; 
      this.getAllCaracters(Number(previousPage));
    }
  }
}
