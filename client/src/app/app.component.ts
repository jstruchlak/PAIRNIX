import { CommonModule, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AccountService } from './services/account.service';
import { HomeComponent } from "./components/home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, NgIf, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  private accountService = inject(AccountService)
  title = 'Pairnix';
  users: any;
  
  ngOnInit(): void {
   this.getUsers();
   this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user)
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
    console.log("hello")
  }
}


