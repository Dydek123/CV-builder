import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import UserDetailsI from "../../model/userDetailsI";
import userDetailsI from "../../model/userDetailsI";
import ExperienceI from "../../model/experienceI";
import experienceI from "../../model/experienceI";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  public details: UserDetailsI = {};
  public userDetailsList: UserDetailsI[] = [];
  public loading: boolean = false;
  public newExperience: ExperienceI = {};
  public isSaved:boolean = false;
  public test:string = '';
  private detailsIdFromRoute: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  };

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    this.detailsIdFromRoute = Number(routeParams.get('id')) | 0;
    this.isSaved = this.detailsIdFromRoute !== 0;
    await this.getDataFromApi(this.detailsIdFromRoute);
  }

  changeValues(): void {
    this.details.agreement = (this.test === '1');
  }

  saveDetails(): void {
    const action = this.detailsIdFromRoute === 0 ? 'addDetails' : `editDetails/${this.details.id_detail}`;
    if (this.detailsIdFromRoute === 0)
      this.http.post<UserDetailsI>(`${environment.api_url}${action}`, this.details)
        .subscribe((response) => {
          this.details = response;
          this.goToNewCV();
        })
    else
      this.http.put<UserDetailsI>(`${environment.api_url}${action}`, this.details)
        .subscribe((response) => {
          this.details = response;
          window.location.reload();
        })
  }

  private goToNewCV():void{
    this.http.get<userDetailsI[]>(`${environment.api_url}getUserDetails`)
      .subscribe((response) => {
        this.userDetailsList = response;
        const newDetail = response.reverse()[0];
        if (newDetail.id_detail !== undefined)
          this.router.navigate(['createCV/', newDetail.id_detail])
      })
  }

  private async getDataFromApi(id: number):Promise<void> {
    this.loading = true;
    await this.detailsExists(id);
    if (this.detailsIdFromRoute !== 0) {
      await this.http.get<UserDetailsI>(`${environment.api_url}getUserDetails/${id}`)
        .subscribe((response) => {
          this.details = response;
        })

      await this.http.get<ExperienceI[]>(`${environment.api_url}getExperience/${id}`)
        .subscribe((response) => {
          this.details.experience = response;
        })

      await this.http.get<experienceI[]>(`${environment.api_url}getExperience/${id}`)
        .subscribe((response) => {
          this.details.experience = response;
          this.changeDateFormat();
        })
    }

    await this.http.get<userDetailsI[]>(`${environment.api_url}getUserDetails`)
      .subscribe((response) => {
        this.userDetailsList = response;
        this.loading = false;
      })
  }

  async changeCV(event: Event):Promise<void>{
    const button = event.target as HTMLButtonElement;
    const detailId = button.value;
    await this.router.navigate(['/createCV/', detailId]);
    await this.getDataFromApi(Number(detailId));
  }

  changeDateFormat():void {
    if (this.details.experience !== undefined)
      for (let experience of this.details.experience) {
        if (experience.start_date)
          experience.start_date = String(experience.start_date).split('T')[0];
        if (experience.end_date)
          experience.end_date = String(experience.end_date).split('T')[0];
      }
  }

  deleteExperience(event: Event):void {
    const button = event.target as HTMLButtonElement;
    const experienceId = button.value;
    console.log(experienceId)
    this.http.delete<ExperienceI>(`${environment.api_url}deleteExperience/${experienceId}`)
      .subscribe((response) => {
        this.updateExperienceList(Number(experienceId));
      })
  }

  saveExperience(event: Event):void {
    const button = event.target as HTMLButtonElement;
    const experienceId = button.value;
    let experience: ExperienceI | null = this.searchForExperience(Number(experienceId));
    if (experience !== null)
      this.http.put<ExperienceI>(`${environment.api_url}editExperience/${experienceId}`, experience)
        .subscribe((response) => {
        })
  }


  private async detailsExists(id: number): Promise<void> {
    await this.http.get<boolean>(`${environment.api_url}detailsExists/${id}`)
      .subscribe((response) => {
        if (!response) this.router.navigate(['createCV']);
      });
  }

  searchForExperience(id: number): ExperienceI | null {
    for (let index in this.details.experience) {
      if (this.details.experience[Number(index)].id_experience === id)
        return this.details.experience[Number(index)];
    }
    return null;
  }

  createExperience():void {
    console.log(this.newExperience)
    this.http.post<ExperienceI>(`${environment.api_url}addExperience/${this.detailsIdFromRoute}`, this.newExperience)
      .subscribe((response) => {
        window.location.reload();
      })
  }

  public openPDF():void {
    let DATA = document.getElementById('toDownload');
    if (DATA) {
      html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = 297;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', -4, position, fileWidth, fileHeight)

        PDF.save('CV.pdf');
      });
    }
  }

  private updateExperienceList(experienceId: number): void {
    for (const routeKey in this.details.experience) {
      if (this.details.experience[Number(routeKey)].id_experience === experienceId)
        this.details.experience?.splice(Number(routeKey),1)
    }
  }
}
