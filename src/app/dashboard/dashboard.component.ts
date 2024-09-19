import { Component, inject, OnInit } from '@angular/core';
import { ResponseData } from '../userModel/userResponse.interface';
import { RefreshtokenService } from '../service/refreshtoken.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  userList = [];

  private readonly service = inject(RefreshtokenService);
  storeData = localStorage.getItem('angular17data');
  dataValue!: ResponseData;

  ngOnInit(): void {
    if (this.storeData != null) {
      console.log(this.storeData);
      this.dataValue = JSON.parse(this.storeData);
      console.log(this.dataValue.token);
    }
    this.getUsers();
    this.service.$refreshTokenReceived.subscribe((res: any) => {
      this.getUsers();
    });
  }

  getUsers() {
    this.service.getAllUser().subscribe((res: any) => {
      this.userList = res;
      console.log(this.userList);
    });
  }
}
