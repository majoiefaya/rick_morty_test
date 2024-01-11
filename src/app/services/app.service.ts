import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class AppService{

    constructor(private httpClient:HttpClient ){

    }
    
    public getAll(page:number):Observable<any>{
        return this.httpClient.get<any>(`https://rickandmortyapi.com/api/character/?page=${page}`);
    }

}
