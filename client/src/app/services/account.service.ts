import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient)
  private presenceService = inject(PresenceService)
  private likeService = inject(LikesService);
  baseUrl = environment.apiUrl;
  // jwt token inside 'currentUser' as a property
  currentUser = signal<User | null>(null);
  roles = computed (() => {
    const user = this.currentUser();
    if (user && user.token) {
      // atob = decode Base64 - split = retrieve jwt payload
      const role = JSON.parse(atob(user.token.split('.')[1])).role;
      return Array.isArray(role) ? role : [role]
    }
    return []
  })

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
    this.presenceService.createHubConnection(user)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.presenceService.stopHubConnection();
  }
}
