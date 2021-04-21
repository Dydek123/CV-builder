import { Component} from '@angular/core';

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
}
