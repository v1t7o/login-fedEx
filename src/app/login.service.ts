import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { userDto } from './models/user-dto/user-dto.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public apiReqUrl: string = 'https://demo-api.now.sh/users' ;

  constructor(private http: HttpClient) { }

  public sendUser(user: userDto): Observable<userDto>{
   return this.http.post<userDto>(this.apiReqUrl, user);
  }
}
