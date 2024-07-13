import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Form } from '../../services/form';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-userdatacomponent',
  templateUrl: './userdatacomponent.component.html',
  styleUrls: ['./userdatacomponent.component.css']
})
export class UserdatacomponentComponent implements OnInit {
  userDatas: Form[] = [];
  userDatasClone: Form[] = [];
  public forms :Form[];
  isDatabaseEmpty = true;
  selectedForm : Form = new Form();
  status: OnlineStatusType = this.onlineStatusService.getStatus();
  onlineStatusCheck = OnlineStatusType;
  constructor(private databaseService: DatabaseService,
              private onlineStatusService:OnlineStatusService,
              private http: HttpClient ) {
                this.forms = []; 
              }

  async onSubmit(username: string, email: string, id: number): Promise<void> {
    if(this.status === this.onlineStatusCheck.ONLINE) {
      if(username && email && id){
      // Add new form
        this.databaseService.createForm(this.selectedForm)
        .subscribe(event => {
            this.forms.push(event);      
          });}
          else {
            console.warn('Please fill out all fields.');
          }
    }else {
      if (username && email && id) {
        const userData: Form = { username, email, id };
        try {
          await this.databaseService.addUserData(userData);
          console.log('Data successfully added to MyIDB.');
          this.userDatas.push(userData);
        } catch (error) {
          console.error('Error adding user data:', error);
        }
      } else {
        console.warn('Please fill out all fields.');
      }
      console.log('offline mode')
    }
}

  private getFormss():void{
    this.databaseService.getForms().subscribe(
      (response: Form []) =>{
      this.forms= response;
    } ,
    (error:  HttpErrorResponse ) =>{
      alert(error.message);
    })  
  }


  private async  getFormsIDB() :Promise<void> {
    try {
      const db = await this.databaseService.openDB();
      const transaction = db.transaction(['objectStore1'], 'readonly');
      const objectStore1 = transaction.objectStore('objectStore1');
      const cursorRequest = objectStore1.openCursor();

      cursorRequest.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          this.userDatas.push(cursor.value);
          cursor.continue();
        }
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  async createForm() {
    const form = <HTMLInputElement>document.getElementById('userForm');
    form.onsubmit = (event) => {
    event.preventDefault();
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const id = parseInt((<HTMLInputElement>document.getElementById('id')).value);

    if (username && email && id) {
      const form: Form = { username, email, id };

      this.databaseService.createForm(form).subscribe(
        (response) => {
          console.log('Form created successfully:', response);
        },
        (error) => {
          console.error('Error creating form:', error);
        }
      );
    } else {
      console.warn('Please fill in all the fields.');
    }}
  }
 
  async onDelete(id: number): Promise<void> {
      try {
        await this.databaseService.deleteUserData(id);
        console.log('Data successfully deleted IDB.');
        this.userDatas = this.userDatas.filter(data => data.id !== id);
      } catch (error) {
        console.error('Error deleting user data:', error);
      }
  }
 
    getClone(): any {
          for (const userData of this.userDatas){
            const copy =JSON.parse(JSON.stringify(userData)) as Form;
            this.userDatasClone.push(copy) ; 
          }
          return (this.userDatasClone);
    }
      

      async syncToMySQLL(): Promise<void> {
        this.userDatasClone =this.getClone();
        try {

        for (const userData of this.userDatasClone) {
          const form = {
            username: userData.username,
            email: userData.email,
            id: userData.id, 
          };
          await this.databaseService.createForm(form).toPromise();
          await this.onDelete(form.id);
          this.getFormss();
        }console.log('Data synced to MySQL');
      } catch (error) {
        console.error('Error syncing data to MySQL:', error);
      } }



      
       async  thiss(): Promise<void> {
       if ((this.status === this.onlineStatusCheck.ONLINE) && ( this.isDatabaseEmpty=== false)) {
        try {
            await this.syncToMySQLL();
        } catch (error) {
        console.error('Error during synchronization:', error);
        }
   }
  }
  
  async ngOnInit(): Promise<void> {
    this.getFormss();
    this.getFormsIDB();
    this.onlineStatusService.status.subscribe(async (status: OnlineStatusType) => {

      this.status = status;
      this.isDatabaseEmpty = await this.databaseService.isDatabaseEmpty();

      if (status === this.onlineStatusCheck.ONLINE && !this.isDatabaseEmpty) {
        await this.thiss();
      }
    });
  }
}
