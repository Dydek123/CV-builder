import { Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  details = [
    {name:'Frontend PK'},
    {name:'Backend Allegro'},
    {name:'Senior Fullstack Developer'},
  ];

  projects = [
    {name: 'Frontend', preview: 'cv-example.png'},
    {name: 'Backend', preview: 'cv-example.png'},
    {name: 'Java', preview: 'cv-example.png'},
    {name: 'Mobile', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
  ]

  constructor(public dialog:MatDialog) {};
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
