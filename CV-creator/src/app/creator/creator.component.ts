import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import UserDetailsI from "../model/userDetailsI";
import ExperienceI from "../model/experienceI";
import {ActivatedRoute, Router} from "@angular/router";
import userDetailsI from "../model/userDetailsI";
import experienceI from '../model/experienceI';
import {formatDate} from "@angular/common";
import detailsI from "../../../../Backend/interfaces/detailsI";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  public details: UserDetailsI = {};
  public userDetailsList: UserDetailsI[] = [];
  public loading:boolean = false;
  private detailsIdFromRoute:number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {};

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    this.detailsIdFromRoute = Number(routeParams.get('id')) | 0;
    await this.getDataFromApi(this.detailsIdFromRoute);
  }

  changeValues(): void {
    console.log(this.details.experience)
  }

  saveDetails(): void {
    const action = this.detailsIdFromRoute===0?'addDetails':`editDetails/${this.details.id_detail}`;
    if (this.detailsIdFromRoute===0)
      this.http.post<UserDetailsI>(`http://localhost:8080/${action}`, this.details)
        .subscribe((response) => {
          this.details = response;
          this.goToNewCV();
        })
    else
      this.http.put<UserDetailsI>(`http://localhost:8080/${action}`, this.details)
        .subscribe((response) => {
          this.details = response;
          window.location.reload();
        })
  }

  private goToNewCV() {
    this.http.get<userDetailsI[]>('http://localhost:8080/getUserDetails')
      .subscribe((response) => {
        this.userDetailsList = response;
        const newDetail = response.reverse()[0];
        if (newDetail.id_detail !== undefined)
          this.router.navigate(['createCV/', newDetail.id_detail])
      })
  }

  private async getDataFromApi(id:number) {
    this.loading = true;
    await this.detailsExists(id);
    if (this.detailsIdFromRoute !== 0) {
      await this.http.get<UserDetailsI>('http://localhost:8080/getUserDetails/' + id)
        .subscribe((response) => {
          this.details = response;
        })

      await this.http.get<ExperienceI[]>('http://localhost:8080/getExperience/' + id)
        .subscribe((response) => {
          this.details.experience = response;
        })

      await this.http.get<experienceI[]>('http://localhost:8080/getExperience/'+ id)
        .subscribe((response) => {
          this.details.experience = response;
          this.changeDateFormat();
        })
    }

    await this.http.get<userDetailsI[]>('http://localhost:8080/getUserDetails')
      .subscribe((response) => {
        this.userDetailsList = response;
        this.loading = false;
      })
  }

  async changeCV(event: Event) {
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    await this.router.navigate(['/createCV/', detailId]);
    await this.getDataFromApi(Number(detailId));
  }

  changeDateFormat(){
    if (this.details.experience !== undefined)
      for (let experience of this.details.experience){
        if (experience.start_date)
          experience.start_date = String(experience.start_date).split('T')[0];
        if (experience.end_date)
          experience.end_date = String(experience.end_date).split('T')[0];
      }
  }

  deleteExperience(event: Event) {
    const button = event.target as HTMLButtonElement;
    const experienceId = button.value;
    console.log(experienceId)
    this.http.delete<ExperienceI>(`http://localhost:8080/deleteExperience/` + experienceId)
      .subscribe((response) => {
        console.log(this.details.experience)
      })
  }

  saveExperience(event: Event) {
    const button = event.target as HTMLButtonElement;
    const experienceId = button.value;
    const experience:ExperienceI|null = this.searchForExperience(Number(experienceId));
    if (experience !== null)
      this.http.put<ExperienceI>(`http://localhost:8080/editExperience/` + experienceId, experience)
        .subscribe((response) => {})
  }


  private async detailsExists(id:number):Promise<void>{
    await this.http.get<boolean>('http://localhost:8080/detailsExists/'+ id)
      .subscribe((response) => {
        if (!response) this.router.navigate(['createCV']);
      });
  }

  searchForExperience(id:number):ExperienceI|null{
    for (let index in this.details.experience){
      if (this.details.experience[Number(index)].id_experience === id)
        return this.details.experience[Number(index)];
    }
    return null;
  }
}
