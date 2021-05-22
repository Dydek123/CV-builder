import {Component} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  button_value = 0;
  opinions = [
    {
      name: 'Jan Kowalski',
      image: 'example_photo.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat ultricies pharetra. Donec fermentum eget metus vitae finibus. Nulla imperdiet, tellus ac finibus placerat, neque dolor facilisis nisi, eu euismod metus lorem id neque. Aliquam non sapien at lacus euismod iaculis id consequat ipsum. Cras dapibus nisi vitae pretium iaculis.'
    },
    {name: 'Anna Kowalczyk', image: 'face.png', text: 'Polecam tą stronę.'},
    {
      name: 'Zdzisław Marecki',
      image: 'example_photo.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat ultricies pharetra. Donec fermentum eget metus vitae finibus. Nulla imperdiet, tellus ac finibus placerat, neque dolor facilisis nisi, eu euismod metus lorem id neque. Aliquam non sapien at lacus euismod iaculis id consequat ipsum. Cras dapibus nisi vitae pretium iaculis.'
    },
  ]
}
