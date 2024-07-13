import { Component } from '@angular/core';
import { Router } from '@angular/router';



declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/test-test', title: 'test test',  icon:'', class: '' },

];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public menuItems: any[];
  constructor(private router: Router){
    this.router = router;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
