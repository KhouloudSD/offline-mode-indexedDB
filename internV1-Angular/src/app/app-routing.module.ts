import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserdatacomponentComponent } from './components/userdatacomponent/userdatacomponent.component';

const routes: Routes = [
 { path: 'test-test', component : UserdatacomponentComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
