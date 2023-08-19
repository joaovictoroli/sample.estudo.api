import { HttpClient, HttpContextToken } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Token } from '../_models/token';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<Token | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  login(model: any) {
    console.log(model);
    return this.http.post<Token>(this.baseUrl + 'auth/login', model).pipe(
      map((response: Token) => {
        const token = response;
        if (token) {
          this.setCurrentUser(token);
          this.toastr.success("Logged in")
        }
      })
    );
  }

  register(model: User) {
    console.log(model);
    return this.http.post<User>(this.baseUrl + 'auth/register', JSON.stringify(model));
  }

  setCurrentUser(user: Token) {
    localStorage.setItem('token', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
