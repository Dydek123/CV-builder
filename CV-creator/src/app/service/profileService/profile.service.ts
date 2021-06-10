import { Injectable } from '@angular/core';
import detailsI from "../../../../../Backend/interfaces/detailsI";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import responseStatus from "../../model/responseStatus";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private details:detailsI[] = [];
  constructor(private httpClient: HttpClient) {
  }

  getDataDetails(): Observable<detailsI[]> {
    return this.httpClient.get<detailsI[]>(`${environment.api_url}getUserDetails`).pipe(
      map((response:detailsI[]) => {
        return response;
      })
    )
  }

  deleteProject(detailId:number):Observable<responseStatus>{
    return this.httpClient.delete<responseStatus>(`${environment.api_url}deleteDetails/${detailId}`).pipe(
      map((response:responseStatus) => {
        return response;
      })
    )
  }
}
