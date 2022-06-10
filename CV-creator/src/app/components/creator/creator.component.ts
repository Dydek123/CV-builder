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
import { CreatorService } from 'src/app/service/creator.service';

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

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private creatorService: CreatorService) {
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
      this.creatorService.saveDetails(action, this.details)
        .subscribe((response) => {
          this.details = response;
          this.goToNewCV();
        })
    else
      this.creatorService.editDetails(action, this.details)
        .subscribe();
  }

  private goToNewCV():void{
    this.creatorService.getUserDetails()
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
    this.getCVDetails(id);
  }

  async getCVDetails(id: number) {
    if (this.detailsIdFromRoute !== 0) {
       this.creatorService.getUserDetailsById(id)
        .subscribe((response) => {
          this.details = response;
        })

      this.creatorService.getExperience(id)
        .subscribe((response) => {
          this.details.experience = response;
          this.changeDateFormat();
        })
    }

    this.creatorService.getUserDetails()
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
    this.creatorService.deleteExperience(experienceId)
      .subscribe((response) => {
        this.updateExperienceList(Number(experienceId));
      })
  }

  saveExperience(event: Event):void {
    const button = event.target as HTMLButtonElement;
    const experienceId = button.value;
    let experience: ExperienceI | null = this.searchForExperience(Number(experienceId));
    if (experience !== null)
      this.creatorService.saveExperience(experienceId, experience)
        .subscribe();
  }


  private async detailsExists(id: number): Promise<void> {
    this.creatorService.detailsExists(id)
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
    this.creatorService.createExperience(this.detailsIdFromRoute, this.newExperience)
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
