import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AppRegisterComponent} from './app-register/app-register.component';
import {ProfileComponent} from './profile/profile.component'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogComponent} from "./profile/dialog/dialog.component";
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {EditDetailsComponent} from "./profile/edit_details/edit_details.component";
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatRadioModule} from '@angular/material/radio';
import {CreatorComponent} from './creator/creator.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    AppRegisterComponent,
    ProfileComponent,
    DialogComponent,
    EditDetailsComponent,
    CreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    NgxMatFileInputModule,
    TextFieldModule,
    MatRadioModule,
    HttpClientModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
