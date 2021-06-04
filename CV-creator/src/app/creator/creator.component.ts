import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import UserDetailsI from "../model/userDetailsI";
import ExperienceI from "../model/experienceI";
import {ActivatedRoute, Router} from "@angular/router";
import userDetailsI from "../model/userDetailsI";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  public details: UserDetailsI = {};
  public userDetailsList: UserDetailsI[] = [];
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
          console.log(response)
          // this.router.navigate(['createCV/', this.details.id_detail])
        })
    else
      this.http.put<UserDetailsI>(`http://localhost:8080/${action}`, this.details)
        .subscribe((response) => {
          this.details = response;
          window.location.reload();
        })
  }

  private async getDataFromApi(id:number) {
    if (this.detailsIdFromRoute !== 0) {
      await this.http.get<UserDetailsI>('http://localhost:8080/getUserDetails/' + id)
        .subscribe((response) => {
          this.details = response;
        })

      await this.http.get<ExperienceI[]>('http://localhost:8080/getExperience/' + id)
        .subscribe((response) => {
          this.details.experience = response;
        })
    }

    await this.http.get<userDetailsI[]>('http://localhost:8080/getUserDetails')
      .subscribe((response) => {
        this.userDetailsList = response;
      })
  }

  async changeCV(event: Event) {
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    await this.router.navigate(['/createCV/', detailId]);
    await this.getDataFromApi(Number(detailId));
  }
}
