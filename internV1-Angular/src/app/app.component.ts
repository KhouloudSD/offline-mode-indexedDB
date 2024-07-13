import { Component } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: OnlineStatusType = this.onlineStatusService.getStatus();
  title = 'intern-v1';
  onlineStatusCheck = OnlineStatusType;

  constructor(private onlineStatusService:OnlineStatusService){
    this.onlineStatusService.status.subscribe((status:OnlineStatusType) => {
      console.log(status)
      this.status= status;
    })
  } 
}

