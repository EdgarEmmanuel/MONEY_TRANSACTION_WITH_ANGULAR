import { DepotFormComponent } from './depot-form/depot-form.component';
import { AuthServiceService } from './auth-service.service';
import { TransactDetailsComponent } from './transact-details/transact-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"home",component:HomepageComponent,canActivate:[AuthServiceService]},
  {path:"login",component:LoginpageComponent},
  {path:"depot",component:DepotFormComponent},
  {path:"transactions",component:TransactionsComponent,canActivate:[AuthServiceService]},
  {path:"transfert/:id",component:TransactDetailsComponent,canActivate:[AuthServiceService]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
