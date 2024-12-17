import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-test-errors',
  standalone: true, 
  imports: [], 
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})

export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient)
  validationErrors: string[] = [];


  get404Error() {
    this.http.get(this.baseUrl + 'bug/not-found').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'bug/bad-request').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'bug/server-error').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + 'bug/auth').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error)
        this.validationErrors = error;
      }
    });
  }
}
