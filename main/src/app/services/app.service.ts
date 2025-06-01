import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class AppService{
    private baseUrl = 'https://rickandmortyapi.com/api/character';

    constructor(private httpClient:HttpClient ){

    }
   
    filterCharacters(params: any): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl, { params });
    }
    getAllCharacters(page:number):Observable<any>{
        return this.httpClient.get<any>(this.baseUrl+`?page=${page}`);
    }

}
