import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderComponent} from "./components/header/header-component";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterModule, Routes} from "@angular/router";
import {MedicationsComponent} from "./components/medications/medications-component";
import {UserInfoComponent} from "./components/user-info/user-info-component";
import {FooterComponent} from "./components/footer/footer-component";
import {HomePageComponent} from "./components/home-page/home-page-component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'medications', component: MedicationsComponent},
  {path: 'userinfo', component: UserInfoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MedicationsComponent,
    UserInfoComponent,
    FooterComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
