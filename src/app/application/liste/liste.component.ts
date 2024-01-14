import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Character } from 'src/app/models/Character';
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
  characters_datas: Character[] = [];
  characters_datas_count=0;
  charactersCopy: Character[] = [...this.characters_datas];
  next!: string;
  previous!: string;
  totalPages!: number;
  currentPage = 1;
  filterForm!: FormGroup;

  constructor(private appService: AppService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadStoredPage();
    this.getAllCaracters(this.currentPage);
    this.initFilterForm();
  }
  initFilterForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [''],
      status: [''],
      species: [''],
      type: [''],
      gender: [''],
    });
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

    this.appService.getAllCharacters(page).subscribe(
      (response: any) => {
        if (response.results.length === 0) {
          this.errorMessage = "No datas to display"
        }
        this.characters_datas = response.results;
        this.currentPage = page;
        this.totalPages = response.info.pages;
        this.characters_datas_count=response.info.count
        this.next = response.info.next;
        this.previous = response.info.prev;
        localStorage.setItem('currentPage', this.currentPage.toString());
        this.loading = false;
      },
      (error) => {
        switch (error.status) {
          case 0:
            this.errorMessage = "Failed to load resource,internet disconnected"
            break
          default:
            this.errorMessage = "Unknow error"
        }
        this.loading = false
      }
    );
  }

  filterCharacters(): void {
    const filterParams = this.filterForm.value;
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;
    this.appService.filterCharacters(filterParams).subscribe(
      (response) => {
        this.charactersCopy = response.results;
        this.characters_datas = this.charactersCopy
        this.totalPages = response.info.pages;
        this.characters_datas_count=response.info.count
        this.next = response.info.next;
        this.previous = response.info.prev;
        this.loading = false;
      },
      (error) => {
        switch (error.status) {
          case 0:
            this.errorMessage = "Failed to load resource,internet disconnected"
            break
          default:
            this.errorMessage = "Unknow error"
        }
        this.loading = false
      }
    );
  }

  applyFilters(): void {
    this.filterCharacters();
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

  getCharactersSize(): number {
    return this.characters_datas.length;
  }
}