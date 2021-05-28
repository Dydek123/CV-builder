import { Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {EditDetailsComponent} from "./edit_details/edit_details.component";
import {HttpClient} from "@angular/common/http";
import detailsI from "../../../../Backend/interfaces/detailsI";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  public details : detailsI[] = [];

  projects = [
    {name: 'Frontend', preview: 'cv-example.png'},
    {name: 'Backend', preview: 'cv-example.png'},
    {name: 'Java', preview: 'cv-example.png'},
    {name: 'Mobile', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
  ]

  userPhoto = ''

  constructor(public dialog:MatDialog, private http: HttpClient) {};

  ngOnInit() {
    this.http.get<{ data: detailsI[]}>('http://localhost:8080/getUserDetails')
      .subscribe((response) => {
        this.details = response.data;
        this.userPhoto = response.data[0].image || 'example_photo.jpg';
      })
  }

  openNewPhotoDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDetailsDialog($event: any): void {
    console.log($event)
    const dialogRef = this.dialog.open(EditDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
