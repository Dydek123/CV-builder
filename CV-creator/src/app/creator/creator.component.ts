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
  public details:detailsI = {};
  constructor(private http: HttpClient) {};

  ngOnInit(): void {
    this.http.get<detailsI>('http://localhost:8080/getUserDetails/4')
      .subscribe((response) => {
        this.details = response;
        console.log(response)
      })
  }

  changeValues() :void {
    console.log(this.details.name)
  }
}
