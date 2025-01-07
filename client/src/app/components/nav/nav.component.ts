import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { NgIf} from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {ToastrService} from 'ngx-toastr'



@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
      },
      error: (error: any) => this.toastr.error(error.error),
    });
  }


  logout() {
    this.accountService.logout();
    this.model.username = '';  
    this.model.password = '';  
    this.router.navigateByUrl('/')
  }
}
