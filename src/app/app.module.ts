import { UserActionService } from './user-action.service';
import { UserInfoService } from './user-info.service';
import { AuthHttpService } from './auth-http.service';
import { ApiSourcesService } from './api-sources.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactDetailsComponent } from './transact-details/transact-details.component';
import { DepotFormComponent } from './depot-form/depot-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    TransactionComponent,
    TransactionsComponent,
    TransactDetailsComponent,
    DepotFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpService, multi: true },
    ApiSourcesService,
    UserInfoService,
    UserActionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
