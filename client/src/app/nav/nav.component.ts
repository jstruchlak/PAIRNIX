import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {};

  constructor(public accountService: AccountService) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => console.log(error),
    });
  }


  logout() {
    this.accountService.logout();
    this.model.username = '';  
    this.model.password = '';  
  }
}
