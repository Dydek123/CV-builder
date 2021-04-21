import { Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  details = [
    {name:'Frontend PK'},
    {name:'Backend Allegro'}
  ];

  projects = [
    {name: 'Frontend', preview: 'cv-example.png'},
    {name: 'Backend', preview: 'cv-example.png'},
    {name: 'Java', preview: 'cv-example.png'},
    {name: 'Mobile', preview: 'cv-example.png'},
    {name: 'Senior Fullstack Developer', preview: 'cv-example.png'},
  ]

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
