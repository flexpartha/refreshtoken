import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpcookieRefreshtokenService } from '../service/httpcookie-refreshtoken.service';
import { Router } from '@angular/router';
import { RootObject } from '../userModel/userResponse.interface';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.scss',
})
export class Login2Component implements OnInit {
  loginForm!: FormGroup;

  private readonly loginservice = inject(HttpcookieRefreshtokenService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

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
          //this.loginservice.setToken(res.data);
          //this.loginservice.setEmailId(res.data.emailId);
          //localStorage.setItem('angular17data', JSON.stringify(res.data));
          //localStorage.setItem('angular17dataemail', res.data.emailId);
          this.router.navigate(['/dashboard2']);
        }
      }
      // (error) => {
      //   console.log(error.statusText);
      // }
    );
  }
}
