import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
  export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;  

  constructor(private accountService: AccountService, private toastr: ToastrService, 
      private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm() {    
    this.registerForm = this.fb.group({      
      username: ['', Validators.required],
      email: ['', Validators.required],      
      from: ['', Validators.required],
      password: ['', [Validators.required, 
        Validators.minLength(6), Validators.maxLength(20), 
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {    
    this.registerForm.get('confirmPassword')!.disable();
    delete this.registerForm.value.confirmPassword;
    var values = {...this.registerForm.value};
    //console.log(values);
    this.accountService.register(values).subscribe({
      next: response => {
        this.cancel();
        this.toastr.success("Registration Succesfull");
      },
      error: error => {
        this.validationErrors = error;
      } 
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
