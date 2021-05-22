import { Component, OnInit } from '@angular/core';
import detailsI from "../../../../Backend/interfaces/detailsI";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  details:detailsI = {};
  constructor(private http: HttpClient) {};

  ngOnInit(): void {
    this.http.get<{ data: detailsI[]}>('http://localhost:8080/getUserDetails/1')
      .subscribe((response) => {
        console.log(response)
        // this.details = response.data;
      })
  }

}
