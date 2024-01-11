import { Component, OnInit } from '@angular/core';
import { Caracter } from 'src/app/models/Caracter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  caracters_datas: Caracter[] = [];
  next!: string;
  previous!: string;
  totalPages!: number;
  currentPage = 1;
  PAGE_SIZE: number = 20;
  

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadStoredPage();
    this.getAllCaracters(this.currentPage);
  }

  private loadStoredPage() {
    let storedPage = Number(localStorage.getItem('currentPage'));
    if (isNaN(storedPage) || storedPage < 1 || storedPage > this.totalPages) {
      storedPage = 1;
    }
    this.currentPage = storedPage;
  }

  getAllCaracters(page: number): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;
    
    this.appService.getAll(page).subscribe(
      (response: any) => {
        console.log(response);
        if (response.results.length === 0) {
          // this.notificationService.showError('Erreur',"")
        }
        this.caracters_datas = response.results;
        this.currentPage = page;
        this.totalPages = response.info.pages;
        this.next = response.info.next;
        this.previous = response.info.prev;
        localStorage.setItem('currentPage', this.currentPage.toString());
        this.loading = false;
      },
      (error) => {
        // Handle error
      },
      () => {
        // Optional completion logic
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
      const nextPage = this.getPageNumberFromUrl(this.next);
      this.getAllCaracters(nextPage);
    }
  }

  previousPage(): void {
    if (this.previous) {
      const previousPage = this.getPageNumberFromUrl(this.previous);
      this.getAllCaracters(previousPage);
    }
  }

  private getPageNumberFromUrl(url: string): number {
    return Number(url.split('=')[1]);
  }
}