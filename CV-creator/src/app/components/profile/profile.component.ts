import { Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {EditDetailsComponent} from "./edit_details/edit_details.component";
import {HttpClient} from "@angular/common/http";
import detailsI from "../../../../../Backend/interfaces/detailsI";
import responseStatus from "../../model/responseStatus";
import {environment} from "../../../environments/environment";
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  public details : detailsI[] = [];
  public loading:boolean = false;
  userPhoto = ''

  constructor(public dialog:MatDialog,
              private http: HttpClient,
              private profileService: ProfileService) {};

  ngOnInit() {
    this.loading = true;
    this.profileService.getUserDetails()
      .subscribe((response) => {
        this.details = response;
        this.userPhoto ='example_photo.jpg';
        this.loading = false;
      })
  }

  openNewPhotoDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe();
  }

  openEditDetailsDialog($event: any): void {
    const dialogRef = this.dialog.open(EditDetailsComponent);
    dialogRef.afterClosed().subscribe();
  }

  copyLink(event: Event):void{
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    navigator.clipboard.writeText(`${environment.api_url}createCV/${detailId}`)
      .then(() => alert('Successfully copied'))
  }

  deleteProject(event: Event):void {
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    this.profileService.deleteProject(detailId)
      .subscribe((response) => {
        if (response.status == 'success'){
          this.updateProjectList(detailId);
        }
      })
  }

  private updateProjectList(detailId:string):void {
    for (const detailsKey in this.details) {
      if (this.details[Number(detailsKey)].id_detail === Number(detailId))
        this.details.splice(Number(detailsKey),1);
    }
  }
}
