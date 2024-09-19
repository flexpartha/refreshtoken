import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RefreshtokenService } from '../service/refreshtoken.service';
import { User } from '../userModel/user.interface';
import { ResponseData, RootObject } from '../userModel/userResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private readonly loginservice = inject(RefreshtokenService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  // constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.loginForm = this.fb.group({
      emailId: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    const payLoad: any = {
      EmailId: this.loginForm.controls['emailId'].value,
      Password: this.loginForm.controls['password'].value,
    };
    console.log(payLoad);
    this.loginservice.onLogin(payLoad).subscribe(
      (res: RootObject) => {
        console.log(res.data);
        if (res.data) {
          localStorage.setItem('angular17data', JSON.stringify(res.data));
          localStorage.setItem('angular17dataemail', res.data.emailId);
          this.router.navigate(['/dashboard']);
        }
      }
      // (error) => {
      //   console.log(error.statusText);
      // }
    );
  }
}
