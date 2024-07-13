import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from './form';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiServerUrl =  environment.apiUrl;

  private dbName = 'myDataBase';
  private version = 3;

  
  openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const idbOpenRequest = window.indexedDB.open(this.dbName, this.version);

      idbOpenRequest.onsuccess = (e : any) => {
        const db = e.target.result;
        resolve(db);
      };

      idbOpenRequest.onerror = (event) => {
        reject('Cannot open IndexedDB');
      };

      idbOpenRequest.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('objectStore1')) {
          const idbObjectStore = db.createObjectStore('objectStore1', {
            keyPath: 'id',
          });
        }
      };
    });
  }
  
  addUserData(userData: Form): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDB();
        const transaction = db.transaction(['objectStore1'], 'readwrite');
        const objectStore1 = transaction.objectStore('objectStore1');
        const addRequest = objectStore1.add(userData);
        
        addRequest.onsuccess = () => {
          resolve();
        };

        addRequest.onerror = () => {
          reject('Failed to add user data.');
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteUserData(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDB();
        const transaction = db.transaction(['objectStore1'], 'readwrite');
        const objectStore1 = transaction.objectStore('objectStore1');
        const deleteRequest = objectStore1.delete(id);
  
        deleteRequest.onsuccess = () => {
          resolve();
        };
  
        deleteRequest.onerror = () => {
          reject('Failed to delete user data.');
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  isDatabaseEmpty(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDB();
        const transaction = db.transaction(['objectStore1'], 'readonly');
        const objectStore1 = transaction.objectStore('objectStore1');
        const countRequest = objectStore1.count();
  
        countRequest.onsuccess = (event: any) => {
          const count = event.target.result;
          resolve(count === 0);
        };
  
        countRequest.onerror = () => {
          reject('Error checking if database is empty.');
        };
      } catch (error) {
        reject(error);
      }
    });
  }



  
  

  constructor(private http: HttpClient) { }

  public getForms(): Observable<any>{
    return this.http.get<Form[]>(`${this.apiServerUrl}/Form/all`)
  }

  createForm(form: Form): Observable<Form> {
    return this.http.post<Form>(`${this.apiServerUrl}/Form/add`, form);
  }
}
  
