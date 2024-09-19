import { Component, inject, OnInit } from '@angular/core';
import { HttpcookieRefreshtokenService } from '../service/httpcookie-refreshtoken.service';
import { ResponseData } from '../userModel/userResponse.interface';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [],
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.scss',
})
export class Dashboard2Component implements OnInit {
  userList = [];
  private readonly service = inject(HttpcookieRefreshtokenService);
  storeData = this.service.getToken();
  dataValue!: ResponseData;
  ngOnInit(): void {
    if (this.storeData != null) {
      console.log(this.storeData);
      this.dataValue = JSON.parse(this.storeData);
      console.log(this.dataValue.token);
      console.log(this.dataValue.emailId);
    }
    this.getUsers();
  }

  getUsers() {
    this.service.getAllUser().subscribe((res: any) => {
      this.userList = res;
      console.log(this.userList);
    });
  }
}
