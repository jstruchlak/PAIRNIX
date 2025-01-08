import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  // new constructor
  private likeService = inject(LikesService);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);
  // old contructor
  constructor(private http: HttpClient) {}

  // Set a signal
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    );
  }

 

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
         this.setCurrentUser(user)
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.likeService.getLikesIds();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
