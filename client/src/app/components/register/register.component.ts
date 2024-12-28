import { Component,inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators,  } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../text-input/text-input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  cancelRegister = output<boolean>();
  model: any = {}
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
      this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required ,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValue('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  // custom validation (called in confirm password)
  matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    // this.accountService.register(this.model).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => this.toastr.error(error.error)
    // })
    console.log(this.registerForm.value);
  }


  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled')
  }

}
