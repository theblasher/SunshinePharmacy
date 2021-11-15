import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from "./components/header/header-component";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterModule, Routes} from "@angular/router";
import {MedicationsComponent} from "./components/medications/medications.component";
import {UserInfoComponent} from "./components/user-info/user-info-component";
import {FooterComponent} from "./components/footer/footer-component";
import {HomePageComponent} from "./components/home-page/home-page-component";
import {CommonModule, DatePipe} from "@angular/common";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {TableComponent} from "./components/table/table.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {PrescriberMedOrderConfirmDialog} from "./components/prescriber-med-order-confirm-dialog/prescriber-med-order-confirm-dialog";
import {MatDialogModule} from "@angular/material/dialog";
import {CheckoutDialogComponent} from "./components/checkout-dialog/checkout-dialog.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxCcModule} from "ngx-cc";
import {OrderConfirmDialogComponent} from "./components/order-confirm-dialog/order-confirm-dialog.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthGuardLoginService} from "./services/auth-guard-login.service";
import {ChangeUsertypeDialogComponent} from "./components/change-usertype-dialog/change-usertype-dialog.component";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";
import {AuthGuardAdminService} from "./services/auth-guard-admin.service";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'medications', component: MedicationsComponent, canActivate: [AuthGuardLoginService]},
  {path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGuardLoginService]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'orderhistory', component: OrderHistoryComponent, canActivate: [AuthGuardAdminService]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MedicationsComponent,
    UserInfoComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TableComponent,
    PrescriberMedOrderConfirmDialog,
    CheckoutDialogComponent,
    OrderConfirmDialogComponent,
    ChangeUsertypeDialogComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgxCcModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
