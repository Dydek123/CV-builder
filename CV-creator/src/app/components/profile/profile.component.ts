import { Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {EditDetailsComponent} from "./edit_details/edit_details.component";
import {HttpClient} from "@angular/common/http";
import detailsI from "../../../../../Backend/interfaces/detailsI";
import responseStatus from "../../model/responseStatus";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  public details : detailsI[] = [];
  public loading:boolean = false;
  userPhoto = ''

  constructor(public dialog:MatDialog, private http: HttpClient) {};

  ngOnInit() {
    this.loading = true;
    this.http.get<detailsI[]>('http://localhost:8080/getUserDetails')
      .subscribe((response) => {
        this.details = response;
        this.userPhoto = response[0].image || 'example_photo.jpg';
        this.loading = false;
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

  copyLink(event: Event) {
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    navigator.clipboard.writeText('http://localhost:4200/createCV/'+detailId)
      .then(() => alert('Successfully copied'))
  }

  deleteProject(event: Event) {
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    this.http.delete<responseStatus>('http://localhost:8080/deleteDetails/' + detailId)
      .subscribe((response) => {
        if (response.status == 'success'){
          window.location.reload();
        }
      })
  }
}
